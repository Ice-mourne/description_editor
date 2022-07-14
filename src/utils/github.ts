import { decode, encode } from 'js-base64'
import { LoginDetails } from './getLogin'
import { sendMessage } from './sendMessage'

interface RespJson {
   content: string
   sha: string
}

export async function githubGet(url: string, login: LoginDetails): Promise<RespJson | null> {
   const resp = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
         authorization: `token ${decode(login.password)}`,
         accept: 'application/vnd.github.v3+json'
      }
   })
   if (resp.status !== 200) {
      sendMessage('Something went wrong while uploading')
      return null
   }

   const respJson: RespJson = await resp.json()
   return {
      content: decode(respJson.content),
      sha: respJson.sha
   }
}

export interface DataToSend {
   sha: string
   content: string
}
export async function githubPut(url: string, data: DataToSend, login: LoginDetails) {
   const resp = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      headers: {
         authorization: `token ${decode(login.password)}`,
         accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
         sha: data.sha,
         branch: 'main',
         message: `Updated by ${login.username}`,
         content: encode(`${data.content}\n`)
      })
   })
   if (resp.status !== 200) {
      sendMessage('Something went wrong while uploading')
      return null
   }
   return resp
}
