import { itemData_context, setItemData_context } from '@components/provider/dataProvider'
import { uploadDescriptionClovis, uploadDescriptionIce } from '@ts/github'
import { useCallback, useContext, useEffect, useState } from 'react'

function eventHandler(handler: Function) {
   useEffect(() => {
      const listener = (e: KeyboardEvent) => {
         handler(e)
      }

      const target = document.querySelector('body') as HTMLElement
      target.addEventListener('keydown', listener)

      return () => {
         target.removeEventListener('keydown', listener)
      }
   }, [handler])
}

export function HotKeys() {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const [pressTimeout, setPressTimeout] = useState<number | null>(null)
   const [keyboardEvent, setKeyboardEvent] = useState<React.KeyboardEvent<HTMLDivElement> | null>(null)

   const eventCallback = useCallback(
      (event) => {
         setKeyboardEvent(event)
      },
      [1]
   )
   eventHandler(eventCallback)

   useEffect(() => {
      uploadHotKey()
   }, [keyboardEvent])

   const uploadHotKey = () => {
      if (keyboardEvent?.key != 'Insert') return

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
