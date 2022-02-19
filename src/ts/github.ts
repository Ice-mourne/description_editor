import {
   ClarityDescription,
   DataToSend,
   FetchOptionsGet,
   FetchOptionsPut,
   GithubData,
   ItemDataTemplate,
   Items,
   RespJson,
   Stats
} from '@interfaces'

function removeEmptyFromObj<T>(dirtyObject: T): T {
   const obj = { ...dirtyObject }
   const remover = (obj: any) => {
      for (const key in obj) {
         if (obj[key] === null || obj[key] === '') delete obj[key]
         // if (obj[key]?.[0] === 0 && obj[key]?.length === 1) delete obj[key] // if [0] remove
         if (!obj[key] || typeof obj[key] !== 'object') continue
         remover(obj[key])
         if (Object.keys(obj[key]).length === 0) delete obj[key]
      }
      return obj
   }
   return remover(obj)
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

const key = localStorage.getItem('key') as string
const fetchUrl = {
   getDescriptionClovis: 'https://api.github.com/repos/Clovis-Breh/clarity-database/contents/descriptions.json',
   getDescriptionIce: 'https://api.github.com/repos/Ice-mourne/clarity-database/contents/descriptions.json',
   getRateLimit: 'https://api.github.com/rate_limit',

   putDescriptionClovis: 'https://api.github.com/repos/Clovis-Breh/clarity-database/contents/descriptions.json',
   putDescriptionIce: 'https://api.github.com/repos/Ice-mourne/clarity-database/contents/descriptions.json'
}

export async function githubGet(option: FetchOptionsGet): Promise<GithubData> {
   const resp = await fetch(fetchUrl[option], {
      method: 'GET',
      mode: 'cors',
      headers: {
         authorization: `token ${atob(key)}`,
         accept: 'application/vnd.github.v3+json'
      }
   })
   return await handleResponse(resp)
}

async function githubPut(option: FetchOptionsPut, data: DataToSend) {
   const resp = await fetch(fetchUrl[option], {
      method: 'PUT',
      mode: 'cors',
      headers: {
         authorization: `token ${atob(key)}`,
         accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
         sha: data.sha,
         branch: 'main',
         message: `Updated ${new Date().toLocaleString()}`,
         content: btoa(`${JSON.stringify(data.content, null, 2)}\n`)
      })
   })
   handleResponse(resp)
}

export async function getDataFromGithub() {
   const githubData = await githubGet('getDescriptionClovis')
   if (!githubData.content) return
   return githubData.content
}

export async function uploadDescriptionClovis(itemData: ItemDataTemplate) {
   const perkData = itemData.perkData,
      editorConverted = itemData.dataFromEditor.converted,
      editorOriginal = itemData.dataFromEditor.original

   // converts stats from string to string[]
   const statConverter = (stats?: Stats) => {
      if (!stats) return
      const statsToSend = { ...stats }
      const converter = (stats: any) => {
         for (const key in stats) {
            if (typeof stats[key] == 'string') {
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
      name: perkData.name,
      id: perkData.id,
      armorName: perkData.itemName,
      armorId: perkData.itemId,
      stats: statConverter(perkData.stats),
      description: editorConverted.mainEditor,
      simpleDescription: editorConverted.secondaryEditor,
      editor: {
         mainEditor: editorOriginal.mainEditor,
         secondaryEditor: editorOriginal.secondaryEditor
      },
      lastUpdate: Date.now()
   }

   const githubData = await githubGet('getDescriptionClovis')
   const dataToSend: DataToSend = {
      sha: githubData.sha,
      content: {
         ...githubData.content,
         [itemData.inputData.type]: {
            ...githubData.content[itemData.inputData.type],
            [item.id]: item
         }
      }
   }
   const cleanDataToSend = removeEmptyFromObj(dataToSend)
   githubPut('putDescriptionClovis', cleanDataToSend)
   return cleanDataToSend
}

export async function uploadDescriptionIce(itemData: ItemDataTemplate) {
   const dataToSend = await uploadDescriptionClovis(itemData)
   const githubData_ice = await githubGet('getDescriptionIce')

   //todo: i only wan't to update single item not copy database

   // remove data used only by editor
   // const removeEditorData = (idItemObjectArr: { [key: string]: Items }) =>
   //    Object.entries(idItemObjectArr).reduce((acc, [id, item]) => {
   //       delete item.editor
   //       return {
   //          ...acc,
   //          [id]: item
   //       }
   //    }, {} as { [key: string]: Items })

   // const descriptions: Array<[string, { [key: string]: Items }]> = Object.entries(dataToSend.content)
   // const cleanContent = descriptions.reduce((acc, [itemType, idItemObjectArr]) => {
   //    return {
   //       ...acc,
   //       [itemType]: removeEditorData(idItemObjectArr)
   //    }
   // }, {} as ClarityDescription)

   const removeEditorData = (data: DataToSend) => {
      const cleanData = { ...data }
      type key = keyof DataToSend['content'];
      for (const key in data.content) {
         const itemsObj = data.content[key as key]
         for (const key in itemsObj) {
            itemsObj[key].editor = undefined
         }
      }
      return cleanData
   }

   githubPut('putDescriptionIce', {
      sha: githubData_ice.sha,
      content: removeEditorData(dataToSend).content
   })
}

export async function getUnauthorizedDescription() {
   const resp = await fetch('https://raw.githubusercontent.com/Clovis-Breh/clarity-database/main/descriptions.json', {
      method: 'GET',
      mode: 'cors'
   })
   const json: ClarityDescription = await resp.json()
   return json
}
