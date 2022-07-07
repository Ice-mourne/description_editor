import { DescriptionWithEditor } from '@components/provider/dataProvider'
import { apiUrlClovis, ApiUrlIce } from '@data/urls'

import { getLoginDetails, LoginDetails } from './getLogin'
import { sendMessage } from './sendMessage'

interface RespJson {
   content: string
   sha: string
}

type FetchOptionsGet = 'getClovis' | 'getIce'
export async function githubGet(option: FetchOptionsGet): Promise<unknown | null> {
   const login = getLoginDetails()
   if (login === null) {
      sendMessage('Login details missing')
      return null
   }
   const fetchUrl = {
      getClovis: apiUrlClovis,
      getIce: ApiUrlIce
   }

   const resp = await fetch(fetchUrl[option], {
      method: 'GET',
      mode: 'cors',
      headers: {
         authorization: `token ${atob(login.password)}`,
         accept: 'application/vnd.github.v3+json'
      }
   })
   if (resp.status !== 200) {
      sendMessage('Something went wrong while uploading')
      return null
   }

   const respJson: RespJson = await resp.json()
   return {
      content: JSON.parse(atob(respJson.content)),
      sha: respJson.sha
   }
}

type FetchOptionsPut = 'putClovis' | 'putIce'
export interface DataToSend {
   sha: string
   content: string
}
export async function githubPut(option: FetchOptionsPut, data: DataToSend, login: LoginDetails) {
   sendMessage('Uploading...')
   const fetchUrl = {
      putClovis: apiUrlClovis,
      putIce: ApiUrlIce
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
   if (resp.status !== 200) {
      sendMessage('Something went wrong while uploading')
      return
   }
   return resp
}
