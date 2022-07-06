import { setItemData_context } from '@components/provider/dataProvider'

import style from './ItemId.module.scss'
import { useContext } from 'react'

export function ItemId() {
   const setItemData = useContext(setItemData_context)

   const setItemId = (event: React.ChangeEvent<HTMLInputElement>) => {
      setItemData((draft) => {
         draft.input.id = Number(event.target.value)
      })
   }
   return (
      <div className={style.id_input}>
         <span>ID:</span>
         <input type="number" onChange={(e) => setItemId(e)} />
      </div>
   )
}
