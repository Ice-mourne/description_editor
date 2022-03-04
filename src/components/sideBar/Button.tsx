import { getDataFromGithub, uploadDescriptionClovis, uploadDescriptionIce } from '@ts/github'
import { itemData_context, setItemData_context } from '@components/provider/dataProvider'

import { getDataFromBungie } from '@ts/parseBungieData'
import styles from '@styles/sideBar/Button.module.scss'
import { useContext } from 'react'

type fnNames = 'addBungieData' | 'download' | 'uploadClovis' | 'uploadIce'
export function Button({ labelText, fnName }: { labelText: string; fnName?: fnNames }) {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const idPresent = itemData.ItemData.id ? true : false
   const typePresent = itemData.inputData.type ? true : false
   const loginPresent = localStorage.getItem('login') ? true : false

   const errorMessage = () => {
      const message = [
         `${idPresent ? '' : 'Id is missing'}`,
         `${typePresent ? '' : 'Type is missing'}`,
         `${loginPresent ? '' : 'Login to upload'}`,
      ]
         .join('\n')
         .trim()

      setItemData({
         ...itemData,
         message
      })
      setTimeout(() => { // clear message
         setItemData({
            ...itemData,
            message: ''
         })
      }, 15000)
   }

   const allowUpload = idPresent && typePresent && loginPresent ? true : false
   const functions = {
      addBungieData: () =>
         getDataFromBungie(itemData.inputData.id).then((data) => {
            if (!data) return
            const {lastUpdate, updatedBy} = itemData.dataFromGithub?.[data.id] || {}
            setItemData({
               ...itemData,
               ItemData: {
                  ...itemData.ItemData,
                  lastUpdate: lastUpdate ? new Date(lastUpdate).toLocaleString() : undefined,
                  updatedBy,
                  ...data
               }
            })
         }),
      download: () =>
         getDataFromGithub().then((data) =>
            setItemData((itemData) => ({
               ...itemData,
               dataFromGithub: data
            }))
         ),
      uploadClovis: () => (allowUpload ? uploadDescriptionClovis(itemData) : errorMessage()),
      uploadIce: () => (allowUpload ? uploadDescriptionIce(itemData) : errorMessage()),
      doNothing: () => {}
   }

   const buttonId = labelText == 'Change Editor' ? 'toggleEditor' : undefined
   return (
      <button className={styles.button} onClick={functions[fnName || 'doNothing']} id={buttonId}>
         {labelText}
      </button>
   )
}
