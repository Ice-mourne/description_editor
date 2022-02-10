import { Fetch } from './interfaces'

const options = (option: Fetch.PossibleOptions, data: any) => {
   switch (option) {
      case 'getDescription':
         return {
            method: 'GET',
            link: `https://api.github.com/repos/Clovis-Breh/Clarity-database/contents/descriptions.json?ref=main`,
            token: `token ${atob(localStorage.getItem('key') || '')}`
         }
      case 'putDescription':
         return {
            method: 'PUT',
            link: `https://api.github.com/repos/Clovis-Breh/Clarity-database/contents/descriptions.json`,
            token: `token ${atob(localStorage.getItem('key') || '')}`,
            body: {
               sha: data.sha,
               branch: 'main',
               message: `Updated ${new Date().toLocaleString()}`,
               content: btoa(`${JSON.stringify(data.content, null, 2)}\n`)
            }
         }
   }
}

export async function github(_option: Fetch.PossibleOptions, data?: object): Promise<Fetch.Response | undefined> {
   const option = options(_option, data)
   const resp = await fetch(option.link, {
      method: option.method,
      mode: 'cors',
      headers: {
         authorization: option.token,
         accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(option?.body)
   })
   const { content, sha } = await resp.json()

   if (option.method == 'GET') {
      return {
         status: resp.status,
         content: JSON.parse(atob(content)),
         sha
      }
   }
}
