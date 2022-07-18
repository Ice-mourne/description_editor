import { ItemDataTemplate, itemData_context, SelectableType, setItemData_context } from '@components/provider/dataProvider'

import { getDataFromBungie } from '@ts/getDataFromBungie'
import { sendMessage } from '@utils/sendMessage'
import { uploadDescriptions } from '@utils/uploadDescriptions'
import { current } from 'immer'
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
      uploadDescriptions(itemData, true, setItemData).then((message) => {
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
      getDataFromBungie(itemData.input.perkHash, itemData.input.itemHash, itemData.input.type).then((data) => {
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
               description: [],
               visible: true
            }
            draft.selectedPerkHash = data.id
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
      let draftSnapshot: ItemDataTemplate
      setItemData((draft) => {
         draftSnapshot = current(draft)
         draft.selectedPerkHash = 0
         delete draft.description.modified[itemData.selectedPerkHash]
         draft.input.type = 'none'
      })
      setTimeout(() => {
         setItemData((draft) => {
            draft.input.type = draftSnapshot.input.type
         })
      }, 1);
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

export function ButtonInvestmentStatOnly() {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const investmentStatOnly = itemData.description.modified[itemData.selectedPerkHash].investmentStatOnly
   const togglePerkDisplay = () => {
      setItemData((draft) => {
         draft.description.modified[itemData.selectedPerkHash].investmentStatOnly = !investmentStatOnly
      })
   }

   const labelText = investmentStatOnly ? 'Revert to Normal Description' : 'Set as Optional'

   return (
      <button
         className={`${styles.button} ${investmentStatOnly ? styles.active : undefined}`}
         onClick={togglePerkDisplay}
      >
         {labelText}
      </button>
   )
}

export function ButtonCopyOriginalDescriptionToNewDescription({ labelText }: { labelText: string }) {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const selectedPerkHash = itemData.selectedPerkHash

   // changing selected perk to trigger editor update
   const moveDescription = () => {
      setItemData((draft) => {
         draft.description.modified[selectedPerkHash] = draft.description.descriptionsIce[selectedPerkHash]
         draft.selectedPerkHash = 0
      })
      setTimeout(() => {
         setItemData((draft) => {
            draft.selectedPerkHash = selectedPerkHash
         })
      }, 1)
   }

   return (
      <button className={styles.button} onClick={moveDescription}>
         {labelText}
      </button>
   )
}
