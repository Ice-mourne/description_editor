import { DescriptionWithEditor, ItemDataTemplate } from '@components/provider/dataProvider'
import { apiUrls, descriptionUrls } from '@data/urls'
import { decode } from 'js-base64'
import { getLoginDetails, LoginDetails } from './getLogin'
export interface ClovisGithubDataJson {
   descriptions: DescriptionWithEditor
   saved: ItemDataTemplate['saved']
}

const authorized = async (login: LoginDetails) => {
   const response = await fetch(apiUrls.clovis, {
      method: 'GET',
      mode: 'cors',
      headers: {
         authorization: `token ${decode(login.password)}`,
         accept: 'application/vnd.github.v3+json'
      }
   })
   const json = await response.json()
   const description: ClovisGithubDataJson = JSON.parse(decode(json.content))
   return description
}

const unauthorized = async () => {
   const response = await fetch(descriptionUrls.clovis, {
      method: 'GET',
      mode: 'cors'
   })
   const json: ClovisGithubDataJson = await response.json()
   return json
}

export async function getDescriptionClovis() {
   const login = getLoginDetails()

   if (login) {
      try {
         return await authorized(login)
      } catch {
         return await unauthorized()
      }
   }
   return await unauthorized()
}

export const getDescriptionIce = async () => {
   const response = await fetch(descriptionUrls.iceWithEditor, {
      method: 'GET',
      mode: 'cors'
   })
   const json = await response.json()
   return json.descriptions as DescriptionWithEditor
}
