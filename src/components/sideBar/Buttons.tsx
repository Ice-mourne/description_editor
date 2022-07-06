import { itemData_context, SelectableType, setItemData_context } from '@components/provider/dataProvider'

import { getDataFromBungie } from '@ts/getDataFromBungie'
import { sendMessage } from '@utils/sendMessage'
import { uploadDescriptionClovis, uploadDescriptionIce } from '@utils/uploadDescriptions'
import { useContext, useEffect, useState } from 'react'
import styles from './Buttons.module.scss'

export function Button({ labelText }: { labelText: string }) {
   const buttonId = labelText == 'Change Editor' ? 'toggleEditor' : undefined
   return (
      <button className={styles.button} id={buttonId}>
         {labelText}
      </button>
   )
}

export function ButtonUploadIce({ labelText }: { labelText: string }) {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const [updateOriginal, setUpdateOriginal] = useState(false)

   const uploadIce = () => {
      uploadDescriptionIce(itemData, itemData.markedForLive).then((message) => {
         if (message === 'Success') setUpdateOriginal(!message)
      })
      setItemData((draft) => {
         draft.markedForLive = []
      })
   }

   useEffect(() => {
      setItemData((draft) => {
         draft.description.original = itemData.description.modified
      })
   }, [updateOriginal])

   return (
      <button className={styles.button} onClick={uploadIce}>
         {labelText}
      </button>
   )
}

export function ButtonUploadClovis({ labelText }: { labelText: string }) {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const [updateOriginal, setUpdateOriginal] = useState(false)

   const uploadClovis = () => {
      uploadDescriptionClovis(itemData).then((message) => {
         if (message === 'Success') setUpdateOriginal(!message)
      })
   }

   useEffect(() => {
      setItemData((draft) => {
         draft.description.original = itemData.description.modified
      })
   }, [updateOriginal])

   return (
      <button className={styles.button} onClick={uploadClovis}>
         {labelText}
      </button>
   )
}

export function ButtonMarkForLive({ labelText }: { labelText: string }) {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const markForLive = () => {
      setItemData((draft) => {
         draft.markedForLive.push(itemData.selectedPerkHash)
      })
   }

   return (
      <button className={styles.button} onClick={markForLive}>
         {labelText}
      </button>
   )
}

export function ButtonAddBungieData({ labelText }: { labelText: string }) {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const addBungieData = () => {
      if (itemData.input.type === '') {
         sendMessage('Please select a type first.')
         return
      }
      getDataFromBungie(itemData.input.id).then((data) => {
         if (!data) return
         const { lastUpdate, updatedBy } = itemData.description.modified?.[data.id] || {
            lastUpdate: 0,
            updatedBy: ''
         }
         setItemData((draft) => {
            draft.description.modified[data.id] = {
               ...draft.description.modified[data.id],
               ...data,
               lastUpdate,
               updatedBy,
               type: draft.input.type as SelectableType,
               description: []
            }
         })
      })
   }

   return (
      <button className={styles.button} onClick={addBungieData}>
         {labelText}
      </button>
   )
}

export function ButtonDeletePerk({ labelText }: { labelText: string }) {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const deletePerk = () => {
      setItemData((draft) => {
         delete draft.description.modified[itemData.selectedPerkHash]
      })
   }

   return (
      <button className={styles.button} onClick={deletePerk}>
         {labelText}
      </button>
   )
}
