import styles from './Message.module.scss'
import { useExternalEventListener } from '@utils/useExternalEventListener'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

export function Message() {
   const messageEvent = useExternalEventListener('#app', 'custom') as CustomEvent
   const [message, setMessage] = useImmer<string[]>([])

   useEffect(() => {
      setMessage((draft) => {
         draft.push(messageEvent?.detail as string)
      })
      const timeOut = setTimeout(() => {
         setMessage((draft) => {
            draft.pop()
         })
         clearTimeout(timeOut)
      }, 30000)
   }, [messageEvent])

   return (
      <div className={styles.message}>
         {message.map((message, i) => (
            <span key={i}>{message}</span>
         ))}
      </div>
   )
}
