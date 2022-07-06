export interface LoginDetails {
   username: string
   password: string
}

export const getLoginDetails = (): LoginDetails | null => {
   const loginString = localStorage.getItem('login')
   if (!loginString) return null

   const login = JSON.parse(loginString)
   if (!login.userName && !login.password) return null

   return login
}
