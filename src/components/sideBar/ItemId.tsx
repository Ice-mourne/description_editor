import style from '@styles/sideBar/ItemId.module.scss'

export function ItemId({ inputEvent }: { inputEvent: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
   return (
      <div className={style.id_input}>
         <span>ID:</span>
         <input type="number" onChange={(e) => inputEvent(e)} />
      </div>
   )
}
