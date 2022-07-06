import { DescriptionWithEditor, ItemDataTemplate } from '@components/provider/dataProvider'
import { compareDescriptions } from './compareDescriptions'
import { ClovisGithubDataJson } from './fetchDescriptions'
import { getLoginDetails } from './getLogin'
import { githubGet, githubPut } from './github'
import { removeEmptyFromObj } from './removeEmptyFromObj'
import { sendMessage } from './sendMessage'

const sendUpdateMessage = (cleanItemData: DescriptionWithEditor, changedPerkHashes: (string | null)[]) => {
   if (changedPerkHashes.length === 1) {
      if (changedPerkHashes[0] === null) return
      sendMessage(
         `Uploaded ${cleanItemData[changedPerkHashes[0]].itemName || cleanItemData[changedPerkHashes[0]].name}`
      )
      return
   }

   for (let i = 0; i < changedPerkHashes.length; i++) {
      const hash = changedPerkHashes[i]
      if (hash === null) continue
      if (i === 5) {
         sendMessage(`And ${changedPerkHashes.length - 5} more ${changedPerkHashes.length} in total`)
         break
      }
      if (i === 0) sendMessage(`Uploaded perks`)
      sendMessage(`${cleanItemData[hash].itemName || cleanItemData[hash].name}`)
   }
}

interface ClovisGithubData {
   content: ClovisGithubDataJson
   sha: string
}

export async function uploadDescriptionClovis(
   itemData: ItemDataTemplate,
   inLiveDatabase = false,
   cleanItemData_?: ItemDataTemplate,
   changedPerkHashes_?: (string | null)[]
) {
   const githubData = await githubGet('getClovis') as ClovisGithubData
   if (!githubData) return

   const login = getLoginDetails()
   if (login === null) {
      if (!inLiveDatabase) sendMessage('Login details missing')
      return
   }

   const cleanItemData = cleanItemData_ || removeEmptyFromObj(itemData)
   const cleanPerks = cleanItemData.description.modified
   const changedPerkHashes = changedPerkHashes_ || compareDescriptions(githubData.content.descriptions, cleanPerks)

   if (changedPerkHashes.length === 0 && !inLiveDatabase) {
      sendMessage('No changes where found')
      return
   }

   const updatedDescriptions = changedPerkHashes.reduce((acc, hash) => {
      if (hash === null) return acc
      if (!cleanPerks[hash].id) return acc // then perk was removed don't add anything
      acc[hash] = {
         ...acc[hash],
         inLiveDatabase,
         lastUpdate: Date.now(),
         updatedBy: login.username
      }

      return acc
   }, cleanPerks)

   const updatedData: ClovisGithubDataJson = {
      descriptions: updatedDescriptions,
      saved: cleanItemData.saved
   }

   const resp = await githubPut(
      'putClovis',
      {
         sha: githubData.sha,
         content: JSON.stringify(updatedData, null, 2)
      },
      login
   )

   if (resp?.status === 200 && !inLiveDatabase) {
      sendUpdateMessage(cleanPerks, changedPerkHashes)
      return 'Success'
   }
}

interface IceGithubData {
   content: DescriptionWithEditor
   sha: string
}

export async function uploadDescriptionIce(itemData: ItemDataTemplate, marked: number[]) {
   const githubData = await githubGet('getIce') as IceGithubData
   if (!githubData) return null

   const login = getLoginDetails()
   if (login === null) {
      sendMessage('Login details missing')
      return
   }

   const cleanItemData = removeEmptyFromObj(itemData)
   const cleanPerks = cleanItemData.description.modified
   const changedPerkHashes = compareDescriptions(githubData.content, cleanPerks)

   if (changedPerkHashes.length === 0) {
      sendMessage('No changes where found')
      return
   }

   const markedForLive = changedPerkHashes.filter((hash) => marked.includes(Number(hash)))

   if (markedForLive.length === 0) {
      sendMessage('No perks were marked for live')
      return
   }

   const updatedDescriptions = markedForLive.reduce((acc, hash) => {
      if (hash === null) return acc
      acc[hash] = {
         ...acc[hash],
         lastUpdate: Date.now(),
         updatedBy: login.username
      }
      delete acc[hash].inLiveDatabase
      delete acc[hash].editor

      return acc
   }, cleanPerks)

   const resp = await githubPut(
      'putIce',
      {
         sha: githubData.sha,
         content: JSON.stringify(updatedDescriptions)
      },
      login
   )

   if (resp?.status === 200) {
      sendUpdateMessage(cleanPerks, changedPerkHashes)
      return 'Success'
   }

   uploadDescriptionClovis(itemData, true, cleanItemData, changedPerkHashes)
}
