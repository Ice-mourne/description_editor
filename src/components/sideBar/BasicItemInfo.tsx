import { itemData_context } from '@components/provider/dataProvider'
import styles from './BasicItemInfo.module.scss'
import { useContext, useEffect, useState } from 'react'

export function BasicInfo() {
   const itemData = useContext(itemData_context)

   const [currentHash, setCurrentHash] = useState(0)
   useEffect(() => {
      setCurrentHash(itemData.selectedPerkHash)
   }, [itemData.selectedPerkHash])
   useEffect(() => {
      setCurrentHash(itemData.input.id)
   }, [itemData.input.id])

   const currentItem =
      itemData.description.modified[currentHash] || itemData.description.modified[currentHash]
   const itemType = itemData.input.type

   function option(): JSX.Element {
      switch (itemType) {
         case 'armorExotic':
            return (
               <>
                  <label>Armor name</label>
                  <span id="input_item_name">{currentItem?.itemName || ''}</span>
                  <label>Armor id</label>
                  <span id="input_item_id">{currentItem?.itemId || ''}</span>
                  <label>Perk name</label>
                  <span id="input_name">{currentItem?.name || ''}</span>
                  <label>Perk id</label>
                  <span id="input_id">{currentItem?.id || ''}</span>
               </>
            )
         case 'armorMod':
         case 'weaponMod':
         case 'ghostMod':
            return (
               <>
                  <label>Mod name</label>
                  <span id="input_item_name">{currentItem?.name || ''}</span>
                  <label>Mod id</label>
                  <span id="input_item_id">{currentItem?.id || ''}</span>
               </>
            )
         case 'weaponFrameExotic':
            return (
               <>
                  <label>Weapon name</label>
                  <span id="input_item_name">{currentItem?.itemName || ''}</span>
                  <label>Weapon id</label>
                  <span id="input_item_id">{currentItem?.itemId || ''}</span>
                  <label>Frame name</label>
                  <span id="input_name">{currentItem?.name || ''}</span>
                  <label>Frame id</label>
                  <span id="input_id">{currentItem?.id || ''}</span>
               </>
            )
         case 'weaponFrame':
            return (
               <>
                  <label>Frame name</label>
                  <span id="input_item_name">{currentItem?.name || ''}</span>
                  <label>Frame id</label>
                  <span id="input_item_id">{currentItem?.id || ''}</span>
               </>
            )
         case 'weaponCatalystExotic':
            return (
               <>
                  <label>Weapon name</label>
                  <span id="input_item_name">{currentItem?.itemName || ''}</span>
                  <label>Weapon id</label>
                  <span id="input_item_id">{currentItem?.itemId || ''}</span>
                  <label>Catalyst name</label>
                  <span id="input_item_name">{currentItem?.name || ''}</span>
                  <label>Catalyst id</label>
                  <span id="input_item_id">{currentItem?.id || ''}</span>
               </>
            )
         case 'weaponPerkExotic':
            return (
               <>
                  <label>Weapon name</label>
                  <span id="input_item_name">{currentItem?.itemName || ''}</span>
                  <label>Weapon id</label>
                  <span id="input_item_id">{currentItem?.itemId || ''}</span>
                  <label>Perk name</label>
                  <span id="input_name">{currentItem?.name || ''}</span>
                  <label>Perk id</label>
                  <span id="input_id">{currentItem?.id || ''}</span>
               </>
            )
         default:
            return (
               <>
                  <label>Perk name</label>
                  <span id="input_item_name">{currentItem?.name || ''}</span>
                  <label>Perk id</label>
                  <span id="input_item_id">{currentItem?.id || ''}</span>
               </>
            )
      }
   }

   return (
      <div className={styles.info_display}>
         {option()}
         <label>Last update</label>
         <span>{currentItem?.lastUpdate ? new Date(currentItem?.lastUpdate).toLocaleString() : ''}</span>
         <label>Updated by</label>
         <span>{currentItem?.updatedBy || ''}</span>
      </div>
   )
}
