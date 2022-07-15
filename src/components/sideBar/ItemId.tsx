import { itemData_context, setItemData_context } from '@components/provider/dataProvider'

import { useContext } from 'react'
import style from './ItemId.module.scss'

export function ItemId() {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const setPerkHash = (event: React.ChangeEvent<HTMLInputElement>) => {
      setItemData((draft) => {
         draft.input.perkHash = Number(event.target.value)
      })
   }
   const setItemHash = (event: React.ChangeEvent<HTMLInputElement>) => {
      setItemData((draft) => {
         draft.input.itemHash = Number(event.target.value)
      })
   }
   return (
      <>
         <div className={style.id_input}>
            <span>ID:</span>
            <input type="number" onChange={(e) => setPerkHash(e)} />
         </div>
         {/weapon.+Exotic/.test(itemData.input.type) && (
            <div className={style.id_input}>
               <span>Item ID:</span>
               <input type="number" onChange={(e) => setItemHash(e)} />
            </div>
         )}
      </>
   )
}
