import { ClarityDescriptionWithEditor, ItemDataTemplate } from 'src/interfaces_2'
import { removeEmptyFromObj, statStringToStatArray, useErrorSuccessMessage } from '@ts/tools'

interface GithubData {
   sha: string
   content: ClarityDescriptionWithEditor
}
async function handleResponse(resp: Response): Promise<GithubData> {
   interface RespJson {
      content: string
      sha: string
      message?: string
   }
   const respJson: RespJson = await resp.json()
   if (resp.status !== 200) {
      const message = respJson.message
      console.error(`Error: ${resp.status} - ${message}`) // temporally disabled error success messages
      // useErrorSuccessMessage(`${message} 😒`)
   } else {
      // useErrorSuccessMessage(` 🍕`)
   }
   return {
      content: typeof respJson.content == 'string' ? JSON.parse(atob(respJson.content)) : null,
      sha: respJson.sha
   }
}

interface Login {
   username: string
   password: string
}
const login = JSON.parse(localStorage.getItem('login') || '{}') as Login
const fetchUrl = {
   getDescriptionClovis: 'https://api.github.com/repos/Clovis-Breh/database-clarity/contents/descriptions.json',
   getDescriptionIce: 'https://api.github.com/repos/Ice-mourne/database-clarity/contents/descriptions.json',
   getRateLimit: 'https://api.github.com/rate_limit',

   putDescriptionClovis: 'https://api.github.com/repos/Clovis-Breh/database-clarity/contents/descriptions.json',
   putDescriptionIce: 'https://api.github.com/repos/Ice-mourne/database-clarity/contents/descriptions.json'
}

type FetchOptionsGet = 'getDescriptionClovis' | 'getDescriptionIce' | 'getRateLimit'
export async function githubGet(option: FetchOptionsGet): Promise<GithubData | undefined> {
   if (!login.password) return
   const resp = await fetch(fetchUrl[option], {
      method: 'GET',
      mode: 'cors',
      headers: {
         authorization: `token ${atob(login.password)}`,
         accept: 'application/vnd.github.v3+json'
      }
   })
   return await handleResponse(resp)
}

type FetchOptionsPut = 'putDescriptionClovis' | 'putDescriptionIce'
export interface DataToSend {
   sha: string
   content: string
}
async function githubPut(option: FetchOptionsPut, data: DataToSend) {
   const fetchUrl = {
      putDescriptionClovis: 'https://api.github.com/repos/Clovis-Breh/database-clarity/contents/descriptions.json',
      putDescriptionIce: 'https://api.github.com/repos/Ice-mourne/database-clarity/contents/descriptions.json'
   }
   const resp = await fetch(fetchUrl[option], {
      method: 'PUT',
      mode: 'cors',
      headers: {
         authorization: `token ${atob(login.password)}`,
         accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
         sha: data.sha,
         branch: 'main',
         message: `Updated by ${login.username}`,
         content: btoa(`${data.content}\n`)
      })
   })
   handleResponse(resp)
}

export async function getDataFromGithub() {
   const githubData = await githubGet('getDescriptionClovis')
   if (!githubData?.content) return
   return githubData.content
}

export async function uploadDescriptionClovis(itemData: ItemDataTemplate, inLiveDatabase = false, newPerk?: any) {
   const perkData = itemData.ItemData,
      editorConverted = itemData.dataFromEditor.converted,
      editorOriginal = itemData.dataFromEditor.original

   const item = {
      ...perkData,
      type: itemData.inputData.type,
      stats: statStringToStatArray(perkData.stats),
      description: editorConverted.mainEditor,
      simpleDescription: editorConverted.secondaryEditor,
      lastUpdate: Date.now(),
      updatedBy: login.username
   }

   const githubData = await githubGet('getDescriptionClovis')
   if (!githubData) return
   const cleanObj = removeEmptyFromObj({
      ...githubData.content,
      [item.id]: {
         ...item,
         editor: editorOriginal,
         inLiveDatabase,
         linkedWith: itemData.linkedPerks
      }
   })

   githubPut('putDescriptionClovis', {
      sha: githubData.sha,
      content: JSON.stringify(cleanObj, null, 2)
   })

   if (itemData.linkedPerks?.length != 0 && !newPerk) {
      itemData.linkedPerks?.forEach((perkId) => {
         const perk = itemData.dataFromGithub?.[perkId]
         if (!perk) return
         uploadDescriptionClovis(itemData, false, {
            ...itemData
         })
      })
   }
   return item
}

export async function uploadDescriptionIce(itemData: ItemDataTemplate) {
   const item = await uploadDescriptionClovis(itemData, true)
   const githubData_ice = await githubGet('getDescriptionIce')
   if (!githubData_ice || !item) return

   const cleanObj = removeEmptyFromObj({
      ...githubData_ice.content,
      [item.id]: item
   })

   githubPut('putDescriptionIce', {
      sha: githubData_ice.sha,
      content: JSON.stringify(cleanObj)
   })
}

export async function getUnauthorizedDescription() {
   return fetch('https://raw.githubusercontent.com/Clovis-Breh/database-clarity/main/descriptions.json', {
      method: 'GET',
      mode: 'cors'
   })
      .then((resp) => resp.json())
      .then((json) => json as ClarityDescriptionWithEditor)
      .catch((err) => undefined)
}
