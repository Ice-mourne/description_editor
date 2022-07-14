import { encode } from 'js-base64'
import { useState } from 'react'
import styles from './Login.module.scss'
export function Login() {
   const [credentials, setCredentials] = useState({
      username: '',
      password: ''
   })
   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('login') !== null)

   const setUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({
         ...credentials,
         username: event.target.value
      })
   }
   const setPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials({
         ...credentials,
         password: encode(event.target.value)
      })
   }
   const login = () => {
      localStorage.setItem('login', JSON.stringify(credentials))
      setIsLoggedIn(true)
   }
   const logout = () => {
      localStorage.removeItem('login')
      setIsLoggedIn(false)
   }

   return isLoggedIn ? (
      <>
         <button onClick={logout} className={styles.login_btn}>
            Logout
         </button>
      </>
   ) : (
      <>
         <div className={styles.login_container}>
            <span>Username</span>
            <input onChange={(e) => setUsername(e)} />
            <span>Password</span>
            <input onChange={(e) => setPassword(e)} type="password" />
         </div>
         <button onClick={login} className={styles.login_btn}>
            Login
         </button>
      </>
   )
}
