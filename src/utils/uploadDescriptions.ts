import { DescriptionWithEditor, ItemDataTemplate } from '@components/provider/dataProvider'
import { apiUrls } from '@data/urls'
import convertDescription from '@ts/convertDescription'
import convertDescription_Crayon from '@ts/customConverters/crayon'
import _ from 'lodash'
import { Updater } from 'use-immer'
import { compareDescriptions } from './compareDescriptions'
import { getLoginDetails } from './getLogin'
import { githubGet, githubPut } from './github'
import { cleanObject } from './removeEmptyFromObj'
import { sendMessage } from './sendMessage'

export async function uploadDescriptions(
   newData: ItemDataTemplate,
   uploadToLive: boolean = false,
   setItemData?: Updater<ItemDataTemplate>
) {
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

   // compare description
   // compare only how it was then editor was opened (or last time button was pressed) vs then upload button pressed
   const dataClovisJson = JSON.parse(dataClovis.content)
   const differences = compareDescriptions(newData.description.original, newData.description.modified)

   // update only parts that were changed this will allow multiple people work on this
   const updatedDataClovis = differences.reduce((acc, key) => {
      acc.descriptions[key] = {
         ...newData.description.modified[key],
         inLiveDatabase: uploadToLive,
         lastUpdate: Date.now(),
         updatedBy: login.username
      }
      return acc
   }, dataClovisJson as { descriptions: DescriptionWithEditor })

   const clovisResp = await githubPut(
      apiUrls.clovis,
      {
         sha: dataClovis.sha,
         content: JSON.stringify(
            {
               descriptions: updatedDataClovis.descriptions,
               saved: newData.saved
            },
            null,
            1
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
         if (perk.editor === undefined) {
            console.log([hash, perk]);
            sendMessage(`${hash} is broken perk remove that crap manually`)
            return acc
         }

         if (Number(hash) === 0) return acc
         // if (!perk.uploadToLive) return acc

         const baseInfo = cleanObject({
            hash: Number(hash),
            name: perk.name,
            itemHash: Number(perk.itemId),
            itemName: perk.itemName,
            lastUpdate: Date.now(),
            updatedBy: login.username,
            type: perk.type,
            investmentStatOnly: perk.investmentStatOnly
         })

         const cleanData = cleanObject({
            description: convertDescription(perk.editor!.mainEditor, Number(hash), newData, setItemData!, 'main'),
            simpleDescription: convertDescription(perk.editor!.secondaryEditor, Number(hash), newData, setItemData!, 'secondary'),
            stats: perk.stats
         })

         acc.clarity[Number(hash)] = {
            ...baseInfo,
            description: cleanData.description,
            stats: cleanData.stats
         }
         acc.crayon[Number(hash)] = {
            ...baseInfo,
            description: convertDescription_Crayon(perk.editor!.mainEditor, Number(hash), newData, setItemData!, 'main'),
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
            1
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
