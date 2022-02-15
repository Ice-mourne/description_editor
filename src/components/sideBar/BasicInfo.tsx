import { itemData_context } from '@components/provider/dataProvider'
import styles from '@styles/sideBar/BasicInfo.module.scss'
import { useContext } from 'react'

export function BasicInfo() {
   const itemData = useContext(itemData_context),
      perkData = itemData.perkData

   function option(): JSX.Element {
      switch (itemData.inputData.type) {
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
         case 'armorMods':
         case 'weaponMods':
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
         <span id="input_item_id">{itemData.perkData.lastUpdate}</span>
      </div>
   )
}
