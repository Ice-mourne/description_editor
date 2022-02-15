import { getDataFromGithub, uploadDescriptionClovis, uploadDescriptionIce } from '@ts/github'
import { itemData_context, setItemData_context } from '@components/provider/dataProvider'

import { getDataFromBungie } from '@ts/parseBungieData'
import styles from '@styles/sideBar/Button.module.scss'
import { useContext } from 'react'

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

   const upload = itemData.perkData.id ? () => uploadDescriptionIce(itemData) : ()=>{} // uploadDescriptionIce // uploadDescriptionClovis
   const download = () =>
      getDataFromGithub().then((data) =>
         setItemData((itemData) => ({
            ...itemData,
            dataFromGithub: data
         }))
      )

   const buttonFunction =
      labelText == 'Get data from bungie'
         ? addBungieData
         : labelText == 'Add / Update description'
         ? upload
         : labelText == 'Get updated data'
         ? download
         : undefined

   const buttonId = labelText == 'Change Editor' ? 'toggleEditor' : undefined
   return (
      <button className={styles.button} onClick={buttonFunction} id={buttonId}>
         {labelText}
      </button>
   )
}
