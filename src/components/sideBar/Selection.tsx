import React, { useContext } from 'react'
import { itemData_context, setItemData_context } from '@components/provider/dataProvider'

import styles from '@styles/sideBar/Selection.module.scss'

type SelectableType = 'none' | 'armorExotic' | 'armorMods' | 'weaponExotic' | 'weaponPerks' | 'weaponFrames' | 'weaponMods'

export function Selection() {
   const setItemData = useContext(setItemData_context)
   const itemData = useContext(itemData_context)

   const typeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemData((itemData) => ({
         ...itemData,
         inputData: {
            ...itemData.inputData,
            type: e.target.value as SelectableType
         }
      }))
   }
   const rarityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemData((itemData) => ({
         ...itemData,
         inputData: {
            ...itemData.inputData,
            rarity: e.target.value
         }
      }))
   }

   const items = () =>
      Object.values(itemData.dataFromGithub?.[itemData.inputData.type] || {}).map((item) => (
         <option key={item.id} value={item.id}>
            {item.name}
         </option>
      ))

   const itemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedItem = itemData.dataFromGithub?.[itemData.inputData.type]?.[e.target.value]
      if (!selectedItem) return
      setItemData((itemData) => ({
         ...itemData,
         perkData: {
            ...itemData.perkData,
            id: selectedItem.id as number,
            name: selectedItem.name,
            itemId: selectedItem.itemId as number,
            itemName: selectedItem.itemName,
            lastUpdate: new Date(selectedItem.lastUpdate).toLocaleString(),
            stats: selectedItem.stats,
            descriptions: {
               mainEditor: selectedItem.editor?.mainEditor,
               secondaryEditor: selectedItem.editor?.secondaryEditor
            }
         }
      }))
   }

   return (
      <div className={styles.selection_list}>
         <select onChange={(e) => typeChange(e)}>
            <option value="none">Select description type</option>
            <option value="armorExotic">Exotic Armor</option>
            <option value="armorMods">Armor Mod</option>
            <option value="weaponExotic">Exotic Weapon</option>
            <option value="weaponPerks">Weapon Perk</option>
            <option value="weaponFrames">Weapon Frame</option>
            <option value="weaponMods">Weapon Mod</option>
         </select>
         <select onChange={(e) => rarityChange(e)}>
            <option value="undefined">Rarity All</option>
            <option value="normal">Rarity Normal</option>
            <option value="exotic">Rarity Exotic</option>
         </select>
         <select onChange={(e) => itemChange(e)}>{items()}</select>
      </div>
   )
}
