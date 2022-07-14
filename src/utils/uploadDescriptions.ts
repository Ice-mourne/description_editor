import { ItemDataTemplate } from '@components/provider/dataProvider'
import { apiUrls } from '@data/urls'
import _ from 'lodash'
import { getLoginDetails } from './getLogin'
import { githubGet, githubPut } from './github'
import { cleanObject } from './removeEmptyFromObj'
import { sendMessage } from './sendMessage'

export async function uploadDescriptions(newData: ItemDataTemplate, uploadToLive: boolean = false) {
   const abortMessage = ['Something went wrong while', 'getting old descriptions aborting'].join('\n')

   const login = getLoginDetails()
   if (login === null) {
      sendMessage(`Login details missing`)
      return
   }
   sendMessage('Uploading...')

   const dataClovis = await githubGet(apiUrls.clovis, login)
   if (dataClovis === null) {
      sendMessage(abortMessage)
      return
   }

   const clovisResp = await githubPut(
      apiUrls.clovis,
      {
         sha: dataClovis.sha,
         content: JSON.stringify(
            {
               descriptions: newData.description.modified,
               saved: newData.saved
            },
            null,
            2
         )
      },
      login
   )
   // if failed stop completely
   if (clovisResp === null) return
   // if we are not uploading to live this is it stop
   if (uploadToLive === false) {
      sendMessage('Upload complete')
      return
   }

   //--- code bellow is for live database

   const descriptionDownloadResp = await Promise.all([
      githubGet(apiUrls.versions, login),
      githubGet(apiUrls.clarity, login),
      githubGet(apiUrls.crayon, login),
      githubGet(apiUrls.dim, login),
      githubGet(apiUrls.lightGG, login),
      githubGet(apiUrls.iceWithEditor, login)
   ])

   const dataVersion = descriptionDownloadResp[0],
      dataClarity = descriptionDownloadResp[1],
      dataCrayon = descriptionDownloadResp[2],
      dataDim = descriptionDownloadResp[3],
      dataLightGG = descriptionDownloadResp[4],
      dataIce = descriptionDownloadResp[5]

   // makes sure we have all data
   if (
      dataVersion === null ||
      dataClarity === null ||
      dataCrayon === null ||
      dataDim === null ||
      dataLightGG === null ||
      dataIce === null
   ) {
      sendMessage(abortMessage)
      return
   }

   // modify data for live databases
   const updatedData = Object.entries(newData.description.modified).reduce(
      (acc, [hash, perk]) => {
         if (Number(hash) === 0) return acc
         if (!perk.uploadToLive) return acc

         const baseInfo = cleanObject({
            hash: Number(hash),
            name: perk.name,
            itemHash: Number(perk.itemId),
            itemName: perk.itemName,
            lastUpdate: Date.now(),
            updatedBy: login.username,
            type: perk.type
         })

         const cleanData = cleanObject({
            description: perk.description,
            simpleDescription: perk.simpleDescription,
            stats: perk.stats
         })

         acc.clarity[Number(hash)] = {
            ...baseInfo,
            description: cleanData.description,
            stats: cleanData.stats
         }
         acc.crayon[Number(hash)] = {
            ...baseInfo,
            description: cleanData.description,
            stats: cleanData.stats
         }
         acc.dim[Number(hash)] = {
            ...baseInfo,
            description: cleanData.simpleDescription
         }
         acc.lightGG[Number(hash)] = {
            ...baseInfo,
            description: cleanData.description,
            stats: cleanData.stats
         }
         return acc
      },
      {
         clarity: JSON.parse(dataClarity.content),
         crayon: JSON.parse(dataCrayon.content),
         dim: JSON.parse(dataDim.content),
         lightGG: JSON.parse(dataLightGG.content)
      } as {
         clarity: { [key: string]: any }
         crayon: { [key: string]: any }
         dim: { [key: string]: any }
         lightGG: { [key: string]: any }
      }
   )

   // look for deleted perks
   const currentPerkHashes = Object.keys(newData.description.modified)
   const oldPerkHashes = Object.keys(JSON.parse(dataIce.content).descriptions)

   // returns perk hashes found in old but not new // deleted ones
   const deletedPerkHashes = _.difference(oldPerkHashes, currentPerkHashes)

   // remove deleted perks from live databases
   type Name = keyof typeof updatedData
   Object.entries(updatedData).forEach(([name, value]) => {
      Object.keys(value).forEach((hash) => {
         if (deletedPerkHashes.includes(hash)) delete updatedData[name as Name][hash]
      })
   })

   // upload to live databases
   const descriptionUploadResp = await Promise.all([
      githubPut(
         apiUrls.clarity,
         {
            sha: dataClarity.sha,
            content: JSON.stringify(updatedData.clarity)
         },
         login
      ),
      githubPut(
         apiUrls.crayon,
         {
            sha: dataCrayon.sha,
            content: JSON.stringify(updatedData.crayon)
         },
         login
      ),
      githubPut(
         apiUrls.dim,
         {
            sha: dataDim.sha,
            content: JSON.stringify(updatedData.dim)
         },
         login
      ),
      githubPut(
         apiUrls.lightGG,
         {
            sha: dataLightGG.sha,
            content: JSON.stringify(updatedData.lightGG)
         },
         login
      )
   ])

   // check if all uploads to live database are successful
   if (descriptionUploadResp.some((resp) => resp === null)) {
      sendMessage(abortMessage)
      return
   }

   const respIceWithEditor = await githubPut(
      apiUrls.iceWithEditor,
      {
         sha: dataIce.sha,
         content: JSON.stringify(
            {
               descriptions: newData.description.modified,
               saved: newData.saved
            },
            null,
            2
         )
      },
      login
   )

   // make sure upload was complete
   if (respIceWithEditor === null) {
      sendMessage(abortMessage)
      return
   }

   // if everything was ok update version
   const newVersion = {
      ...JSON.parse(dataVersion.content),
      descriptions: JSON.parse(dataVersion.content).descriptions + 0.1
   }

   const respVersion = githubPut(
      apiUrls.versions,
      {
         sha: dataVersion.sha,
         content: JSON.stringify(newVersion)
      },
      login
   )

   if (respVersion === null) {
      sendMessage(abortMessage)
      return
   } else {
      sendMessage('Upload complete')
      return 'Upload complete'
   }
}
