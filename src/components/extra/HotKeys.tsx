import { itemData_context, setItemData_context } from '@components/provider/dataProvider'
import { uploadDescriptionClovis, uploadDescriptionIce } from '@ts/github'
import { useContext, useEffect, useState } from 'react'

export function HotKeys() {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const [pressTimeout, setPressTimeout] = useState<number | null>(null)

   const keyboardEvent = useExternalEventListener('body', 'keydown') as React.KeyboardEvent<HTMLDivElement> | null
   console.log(keyboardEvent)
   
   useEffect(() => {
      uploadHotKey()
   }, [keyboardEvent])


   const uploadHotKey = () => {
      if (keyboardEvent?.key != 'F8') return

      const idPresent = itemData.ItemData.id ? true : false
      const typePresent = itemData.inputData.type ? true : false
      const loginPresent = localStorage.getItem('login') ? true : false

      const errorMessage = (customMessage?: string) => {
         const message = [
            `${idPresent ? '' : 'Id is missing'}`,
            `${typePresent ? '' : 'Type is missing'}`,
            `${loginPresent ? '' : 'Login to upload'}`,
            `${customMessage ? customMessage : ''}`
         ]
            .join('\n')
            .trim()

         setItemData({
            ...itemData,
            message
         })
         setTimeout(() => {
            // clear message
            setItemData({
               ...itemData,
               message: ''
            })
         }, 15000)
      }

      if (pressTimeout != null && pressTimeout > Date.now()) {
         errorMessage('Slow down!')
         return
      }
      setPressTimeout(Date.now() + 1000)

      const allowUpload = idPresent && typePresent && loginPresent ? true : false

      if (keyboardEvent.shiftKey) {
         allowUpload ? uploadDescriptionIce(itemData) : errorMessage()
      } else {
         allowUpload ? uploadDescriptionClovis(itemData) : errorMessage()
      }
   }

   return null
}




/**
 * Outside react event listener
 * @param targetName querySelector target
 * @param eventType addEventListener event type
 * @returns event
 */
function useExternalEventListener(targetName: string, eventType: keyof HTMLElementEventMap) {
   const [keyboardEvent, setKeyboardEvent] = useState<Event | null>(null)
   useEffect(() => document.querySelector(targetName)?.addEventListener(eventType, (e) => setKeyboardEvent(e)), [])
   return keyboardEvent
}
