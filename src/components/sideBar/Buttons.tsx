import { itemData_context, SelectableType, setItemData_context } from '@components/provider/dataProvider'

import { getDataFromBungie } from '@ts/getDataFromBungie'
import { sendMessage } from '@utils/sendMessage'
import { uploadDescriptions } from '@utils/uploadDescriptions'
import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import styles from './Buttons.module.scss'

export function Button({ labelText }: { labelText: string }) {
   const buttonId = labelText === 'Change Editor' ? 'toggleEditor' : undefined
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
      uploadDescriptions(itemData, true).then((message) => {
         if (message === 'Upload complete') setUpdateOriginal(true)
      })
   }

   useEffect(() => {
      if (updateOriginal) {
         setItemData((draft) => {
            draft.description.original = itemData.description.modified
         })
         setUpdateOriginal(false)
      }
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
      uploadDescriptions(itemData, false).then((message) => {
         if (message === 'Upload complete') setUpdateOriginal(true)
      })
   }

   useEffect(() => {
      if (updateOriginal) {
         setItemData((draft) => {
            draft.description.original = itemData.description.modified
         })
         setUpdateOriginal(false)
      }
   }, [updateOriginal])

   return (
      <button className={styles.button} onClick={uploadClovis}>
         {labelText}
      </button>
   )
}

export function ButtonMarkForLive() {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const currentUploadToLiveState = itemData.description.modified[itemData.selectedPerkHash].uploadToLive

   const markForLive = () => {
      setItemData((draft) => {
         const selected = draft.selectedPerkHash
         draft.description.modified[selected].uploadToLive = !currentUploadToLiveState
      })
   }

   const label = currentUploadToLiveState ? `Don't upload to Live` : 'Select for upload to Live'

   return (
      <button
         className={`${styles.button} ${currentUploadToLiveState ? styles.active : undefined}`}
         onClick={markForLive}
      >
         {label}
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

export function ButtonHidePerk() {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const perkVisible = itemData.description.modified[itemData.selectedPerkHash].visible
   const togglePerkDisplay = () => {
      setItemData((draft) => {
         draft.description.modified[itemData.selectedPerkHash].visible = !perkVisible
      })
   }

   const labelText = perkVisible ? 'Hide Perk' : 'Show Perk'

   return (
      <button className={`${styles.button} ${perkVisible ? undefined : styles.active}`} onClick={togglePerkDisplay}>
         {labelText}
      </button>
   )
}

export function ButtonToggleHiddenPerks() {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const displayHiddenPerks = itemData.displayHiddenPerks
   const toggleHiddenPerks = () => {
      setItemData((draft) => {
         draft.displayHiddenPerks = !displayHiddenPerks
      })
   }

   const labelText = displayHiddenPerks ? 'Hide Hidden Perks' : 'Show Hidden Perks'

   return (
      <button
         className={`${styles.button} ${displayHiddenPerks ? styles.active : undefined}`}
         onClick={toggleHiddenPerks}
      >
         {labelText}
      </button>
   )
}
