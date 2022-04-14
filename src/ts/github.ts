import { ClarityDescriptionWithEditor, ItemDataTemplate } from 'src/interfaces_2'

function removeEmptyFromObj<T>(dirtyObject: T): T {
   const obj = { ...dirtyObject }
   const remover = (obj: any) => {
      for (const key in obj) {
         if (obj[key] === null || obj[key] === '') delete obj[key]
         if (!obj[key] || typeof obj[key] !== 'object') continue
         remover(obj[key])
         if (Object.keys(obj[key]).length === 0) delete obj[key]
      }
      return obj
   }
   return remover(obj)
}

interface GithubData {
   sha: string
   content: ClarityDescriptionWithEditor
}
async function handleResponse(resp: Response): Promise<GithubData> {
   const displayMessage = (msg: string) => {
      const messageContainer = document.querySelector<HTMLDivElement>('#message')
      if (messageContainer) {
         messageContainer.textContent = `${messageContainer.textContent}\n${msg}`.trim()
         setTimeout(() => {
            messageContainer.textContent = ''
         }, 15000)
      }
   }

   interface RespJson {
      content: string
      sha: string
   }
   const respJson: RespJson = await resp.json()
   if (resp.status !== 200) {
      const message: string = (<any>respJson).message
      console.error(`Error: ${resp.status} - ${message}`)
      displayMessage(`${message} 😒`)
   } else {
      displayMessage(` 🍕`)
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
   getDescriptionClovis: 'https://api.github.com/repos/Clovis-Breh/clarity-database/contents/descriptions.json',
   getDescriptionIce: 'https://api.github.com/repos/Ice-mourne/clarity-database/contents/descriptions.json',
   getRateLimit: 'https://api.github.com/rate_limit',

   putDescriptionClovis: 'https://api.github.com/repos/Clovis-Breh/clarity-database/contents/descriptions.json',
   putDescriptionIce: 'https://api.github.com/repos/Ice-mourne/clarity-database/contents/descriptions.json'
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
         message: `Updated ${new Date().toLocaleString()}`,
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

export async function uploadDescriptionClovis(itemData: ItemDataTemplate, notInLiveDatabase = true) {
   const perkData = itemData.ItemData,
      editorConverted = itemData.dataFromEditor.converted,
      editorOriginal = itemData.dataFromEditor.original

   // converts stats from string to string[]
   const statConverter = (stats?: { [key: string]: any }) => {
      if (!stats) return
      const statsToSend = { ...stats }
      const converter = (stats: any) => {
         for (const key in stats) {
            if (typeof stats[key] == 'string' && stats[key] != '') {
               stats[key] = stats[key].split(',').map((stat: string) => Number(stat))
            }
            if (typeof stats[key] != 'object') continue
            converter(stats[key])
         }
         return stats
      }
      return converter(statsToSend)
   }

   const item = {
      ...perkData,
      type: itemData.inputData.type,
      stats: statConverter(perkData.stats),
      description: editorConverted.mainEditor,
      simpleDescription: editorConverted.secondaryEditor,
      lastUpdate: Date.now(),
      updatedBy: login.username,
      notInLiveDatabase
   }

   const githubData = await githubGet('getDescriptionClovis')
   if (!githubData) return
   const cleanObj = removeEmptyFromObj({
      ...githubData.content,
      [item.id]: {
         ...item,
         editor: editorOriginal
      }
   })

   githubPut('putDescriptionClovis', {
      sha: githubData.sha,
      content: JSON.stringify(cleanObj, null, 2)
   })
   return item
}

export async function uploadDescriptionIce(itemData: ItemDataTemplate) {
   const item = await uploadDescriptionClovis(itemData, false)
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
   return fetch('https://raw.githubusercontent.com/Clovis-Breh/clarity-database/main/descriptions.json', {
      method: 'GET',
      mode: 'cors'
   })
   .then(resp => resp.json())
   .then(json => json as ClarityDescriptionWithEditor)
   .catch(err => undefined)
}
