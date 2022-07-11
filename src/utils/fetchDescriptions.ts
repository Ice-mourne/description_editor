import { DescriptionWithEditor, ItemDataTemplate } from '@components/provider/dataProvider'
import { getLoginDetails, LoginDetails } from './getLogin'

export interface ClovisGithubDataJson {
   descriptions: DescriptionWithEditor
   saved: ItemDataTemplate['saved']
}

const authorized = async (login: LoginDetails) => {
   const response = await fetch(
      'https://api.github.com/repos/Clovis-Breh/database-clarity/contents/descriptions.json',
      {
         method: 'GET',
         mode: 'cors',
         headers: {
            authorization: `token ${atob(login.password)}`,
            accept: 'application/vnd.github.v3+json'
         }
      }
   )
   const json = await response.json()
   const description: ClovisGithubDataJson = JSON.parse(atob(json.content))
   return description
}

const unauthorized = async () => {
   const response = await fetch('https://clovis-breh.github.io/database-clarity/descriptions.json', {
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
   const response = await fetch('https://ice-mourne.github.io/database-clarity/descriptionsWithEditor.json', {
      method: 'GET',
      mode: 'cors'
   })
   const json: {
      descriptions: DescriptionWithEditor
      saved: {
         perks: {
            [key: number]: {
               [key: string ]: string
            }
         }
         variables: {
            [key: number]: {
               [key: string]: string
            }
         }
      }
   } = await response.json()
   return json
}