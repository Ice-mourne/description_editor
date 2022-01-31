import styles from '@styles/sideBar/BasicInfo.module.scss'

export function BasicInfo({ selected, itemData }: { selected: string; itemData: any }) {
   function option(): JSX.Element {
      switch (selected) {
         case 'armorExotic':
            return (
               <>
                  <label>Armor name</label>
                  <span id="input_item_name">{itemData.armorName || ''}</span>
                  <label>Armor id</label>
                  <span id="input_item_id">{itemData.armorId || ''}</span>
                  <label>Perk name</label>
                  <span id="input_name">{itemData.name || ''}</span>
                  <label>Perk id</label>
                  <span id="input_id">{itemData.id || ''}</span>
               </>
            )
         case 'armorMod':
         case 'weaponMod':
            return (
               <>
                  <label>Mod name</label>
                  <span id="input_item_name">{itemData.name || ''}</span>
                  <label>Mod id</label>
                  <span id="input_item_id">{itemData.id || ''}</span>
               </>
            )
         default:
            return (
               <>
                  <label>Perk name</label>
                  <span id="input_item_name">{itemData.name || ''}</span>
                  <label>Perk id</label>
                  <span id="input_item_id">{itemData.id || ''}</span>
               </>
            )
      }
   }

   return (
      <div className={styles.info_display}>
         {option()}
         <label>Last update</label>
         <span id="input_item_id">2022.1.27-13.22</span>
      </div>
   )
}
