import { itemData_context, setItemData_context } from '@components/provider/dataProvider'

import { getDataFromBungie } from '@ts/parseBungieData'
import styles from '@styles/sideBar/Button.module.scss'
import { useContext } from 'react'
import { uploadToGithub } from '@ts/uploadToGithub'

export function Button({ labelText }: { labelText: string }) {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const addBungieData = () => {
      getDataFromBungie(itemData.inputData.inputId).then((data) =>
         setItemData({
            ...itemData,
            perkData: {
               ...itemData.perkData,
               ...data
            }
         })
      )
   }

   const upload = () => {
      uploadToGithub(itemData)
      .then((data) => {
         setItemData({
            ...itemData,
            dataFromGithub: data
         })
      })
   }

   const buttonFunction =
      labelText == 'Get data from bungie' ? addBungieData : labelText == 'Add / Update description' ? upload : undefined

   const buttonId = labelText == 'Change Editor' ? 'toggleEditor' : undefined
   return (
      <button className={styles.button} onClick={buttonFunction} id={buttonId}>
         {labelText}
      </button>
   )
}
