import { itemData_context, setItemData_context } from '@components/provider/dataProvider'

import style from '@styles/sideBar/ItemId.module.scss'
import { useContext } from 'react'

export function ItemId() {
   const itemData = { ...useContext(itemData_context) }
   const setItemData = useContext(setItemData_context)

   const setItemId = (event: React.ChangeEvent<HTMLInputElement>) => {
      itemData.inputData.inputId = event.target.value
      return setItemData(itemData)
   }
   return (
      <div className={style.id_input}>
         <span>ID:</span>
         <input type="number" onChange={(e) => setItemId(e)} />
      </div>
   )
}
