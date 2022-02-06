import { Fetch } from './interfaces'

const options: Fetch.Options = {
   getDescription: {
      method: 'GET',
      link: `https://api.github.com/repos/Clovis-Breh/Clarity-database/contents/descriptions.json?ref=main?${Math.random()}`,
      token: `token ${atob(localStorage.getItem('key') || '')}`
   },
   putDescription: {
      method: 'PUT',
      link: `https://api.github.com/repos/Clovis-Breh/Clarity-database/contents/descriptions.json`,
      token: `token ${atob(localStorage.getItem('key') || '')}`,
      body: {
         'sha': 'sha',
         'branch': 'main',
         'message': `Updated - `,
         'content': btoa(`${JSON.stringify('content', null, 2)}\n`)
      }
   }
}

async function github( option: Fetch.PossibleOptions, data?: object): Promise<Fetch.Response> {
   const resp = await fetch(options[option].link, {
      method: options[option].method,
      mode: 'cors',
      headers: {
         authorization: options[option].token,
         accept: 'application/vnd.github.v3+json'
      },
      body: JSON.stringify(options[option]?.body)
   })
   const {content, sha} = await resp.json()
   return {
      status: resp.status,
      content,
      sha
   }
}
const {status, content, sha} = await github('getDescription')

