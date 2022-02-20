import { getDataFromGithub, uploadDescriptionClovis, uploadDescriptionIce } from '@ts/github'
import { itemData_context, setItemData_context } from '@components/provider/dataProvider'

import { getDataFromBungie } from '@ts/parseBungieData'
import styles from '@styles/sideBar/Button.module.scss'
import { useContext, useRef } from 'react'

type fnNames = 'addBungieData' | 'download' | 'uploadClovis' | 'uploadIce'
export function Button({ labelText, fnName }: { labelText: string; fnName?: fnNames }) {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const idPresent = itemData.perkData.id ? true : false
   const typePresent = itemData.inputData.type != 'none' ? true : false

   const errorMessage = () => {
      const message = [`${idPresent ? '' : 'Id is missing'}`, `${typePresent ? '' : 'Type is missing'}`]
         .join('\n')
         .trim()

      setItemData({
         ...itemData,
         error: message
      })
      setTimeout(() => {
         setItemData({
            ...itemData,
            error: ''
         })
      }, 15000)
   }

   const allowUpload = idPresent && typePresent ? true : false
   const functions = {
      addBungieData: () =>
         getDataFromBungie(itemData.inputData.inputId).then((data) =>
            setItemData({
               ...itemData,
               perkData: {
                  ...itemData.perkData,
                  ...data
               }
            })
         ),
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
