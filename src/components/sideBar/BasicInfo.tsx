import { itemData_context, setItemData_context } from '@components/provider/dataProvider'
import styles from '@styles/sideBar/BasicInfo.module.scss'
import { useContext } from 'react'

export function BasicInfo() {
   const itemData = useContext(itemData_context),
      perkData = itemData.perkData
   const setItemData = useContext(setItemData_context)

   function option(): JSX.Element {
      switch (itemData.inputData.selected) {
         case 'armorExotic':
            return (
               <>
                  <label>Armor name</label>
                  <span id="input_item_name">{perkData.armorName || ''}</span>
                  <label>Armor id</label>
                  <span id="input_item_id">{perkData.armorId || ''}</span>
                  <label>Perk name</label>
                  <span id="input_name">{perkData.name || ''}</span>
                  <label>Perk id</label>
                  <span id="input_id">{perkData.id || ''}</span>
               </>
            )
         case 'armorMod':
         case 'weaponMod':
            return (
               <>
                  <label>Mod name</label>
                  <span id="input_item_name">{perkData.name || ''}</span>
                  <label>Mod id</label>
                  <span id="input_item_id">{perkData.id || ''}</span>
               </>
            )
         default:
            return (
               <>
                  <label>Perk name</label>
                  <span id="input_item_name">{perkData.name || ''}</span>
                  <label>Perk id</label>
                  <span id="input_item_id">{perkData.id || ''}</span>
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
