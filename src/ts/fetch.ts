export async function github(link: string, method: string, body?: string): Promise<any> {
   const handleResponse = (response: Response) => {
      switch (response.status) {
         case 200:
            // count.next()
            break
         case 409:
         // button.textContent = `Repeating upload`
         default:
            // button.textContent = `Upload failed 😒 ${response.status}`
            break
      }
      return response.json()
   }

   return new Promise((resolve, reject) => {
      const token = atob(localStorage.getItem('key') || '')
      fetch(`https://api.github.com/repos/Clovis-Breh/Icemournes-D2-database${link}`, {
         method: method,
         mode: 'cors',
         headers: {
            authorization: `token ${token}`,
            accept: 'application/vnd.github.v3+json'
         },
         body: JSON.stringify(body)
      })
         .then(handleResponse)
         .then((resp) => resolve(resp))
         .catch(reject)
   })
}
