import {
   ClarityDescription,
   DataToSend,
   FetchOptionsGet,
   FetchOptionsPut,
   GithubData,
   ItemDataTemplate,
   Items,
   RespJson
} from '@interfaces'

async function handleResponse(resp: Response): Promise<GithubData> {
   const respJson: RespJson = await resp.json()
   if (resp.status !== 200) {
      const message: string = (<any>respJson).message
      console.error(`Error: ${resp.status} - ${message}`)

      const messageContainer = document.querySelector<HTMLDivElement>('#message')
      if (messageContainer) {
         messageContainer.textContent = `${messageContainer.textContent}\n${message} 😒`.trim()
         setTimeout(() => {
            messageContainer.textContent = ''
         }, 15000)
      }
   } else {
      const messageContainer = document.querySelector<HTMLDivElement>('#message')
      if (messageContainer) {
         messageContainer.textContent = `${messageContainer.textContent} 🍕`.trim()
         setTimeout(() => {
            messageContainer.textContent = ''
         }, 15000)
      }
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

   const item = {
      name: perkData.name,
      id: perkData.id,
      armorName: perkData.armorName,
      armorId: perkData.armorId,
      description: editorConverted.mainEditor,
      simpleDescription:
         Object.keys(editorConverted.secondaryEditor).length > 0 ? editorConverted.secondaryEditor : undefined,
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
   githubPut('putDescriptionClovis', dataToSend)
   return dataToSend
}

export async function uploadDescriptionIce(itemData: ItemDataTemplate) {
   const dataToSend = await uploadDescriptionClovis(itemData)
   const githubData_ice = await githubGet('getDescriptionIce')

   // remove data used only by editor
   const removeEditorData = (idItemObjectArr: { [key: string]: Items }) =>
      Object.entries(idItemObjectArr).reduce((acc, [id, item]) => {
         delete item.editor
         return {
            ...acc,
            [id]: item
         }
      }, {} as { [key: string]: Items })

   const descriptions: Array<[string, { [key: string]: Items }]> = Object.entries(dataToSend.content)
   const cleanContent = descriptions.reduce((acc, [itemType, idItemObjectArr]) => {
      return {
         ...acc,
         [itemType]: removeEditorData(idItemObjectArr)
      }
   }, {} as ClarityDescription)

   githubPut('putDescriptionIce', {
      sha: githubData_ice.sha,
      content: cleanContent
   })
}

export async function getUnauthorizedDescription() {
   const data = await fetch('https://raw.githubusercontent.com/Clovis-Breh/clarity-database/main/descriptions.json',{
      method: 'GET',
      mode: 'cors',
   })
   const json: ClarityDescription = await data.json()
   return json
}
