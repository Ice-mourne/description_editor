import { itemData_context, setItemData_context } from '@components/provider/dataProvider'

import { getDataFromBungie } from '@ts/parseBungieData'
import styles from '@styles/sideBar/Button.module.scss'
import { useContext } from 'react'

export function Button({ data }: { data: string }) {
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
   const buttonFunction = data == 'Get data from bungie' ? addBungieData : undefined

   const buttonId = data == 'Change Editor' ? 'toggleEditor' : undefined
   return (
      <button className={styles.button} onClick={buttonFunction} id={buttonId}>
         {data}
      </button>
   )
}
