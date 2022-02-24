import { itemData_context } from '@components/provider/dataProvider'
import styles from '@styles/sideBar/BasicInfo.module.scss'
import { useContext } from 'react'

export function BasicInfo() {
   const itemData = useContext(itemData_context),
      perkData = itemData.ItemData

   function option(): JSX.Element {
      switch (itemData.inputData.type) {
         case 'armorExotic':
            return (
               <>
                  <label>Armor name</label>
                  <span id="input_item_name">{perkData.itemName || ''}</span>
                  <label>Armor id</label>
                  <span id="input_item_id">{perkData.itemId || ''}</span>
                  <label>Perk name</label>
                  <span id="input_name">{perkData.name || ''}</span>
                  <label>Perk id</label>
                  <span id="input_id">{perkData.id || ''}</span>
               </>
            )
         case 'armorMod':
         case 'weaponMod':
         case 'ghostMod':
            return (
               <>
                  <label>Mod name</label>
                  <span id="input_item_name">{perkData.name || ''}</span>
                  <label>Mod id</label>
                  <span id="input_item_id">{perkData.id || ''}</span>
               </>
            )
         case 'weaponFrameExotic':
         case 'weaponFrame':
            return (
               <>
                  <label>Frame name</label>
                  <span id="input_item_name">{perkData.name || ''}</span>
                  <label>Frame id</label>
                  <span id="input_item_id">{perkData.id || ''}</span>
               </>
            )
         case 'weaponCatalystExotic':
            return (
               <>
                  <label>Catalyst name</label>
                  <span id="input_item_name">{perkData.name || ''}</span>
                  <label>Catalyst id</label>
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
         <span id="input_item_id">{itemData.ItemData.lastUpdate}</span>
      </div>
   )
}
