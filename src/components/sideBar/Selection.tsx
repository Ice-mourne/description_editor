import { itemData_context, setItemData_context } from '@components/provider/dataProvider'
import styles from '@styles/sideBar/Selection.module.scss'
import React, { useContext } from 'react'

type SelectableType = 'none' | 'armorExotic' | 'armorMods' | 'weaponPerks' | 'weaponFrames' | 'weaponMods'

export function Selection() {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const typeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      itemData.inputData.type = e.target.value as SelectableType
      setItemData(itemData)
   }
   const rarityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      itemData.inputData.rarity = e.target.value
      setItemData(itemData)
   }


   return (
      <div className={styles.selection_list}>
         <select onChange={(e) => typeChange(e)}>
            <option value="none">Select description type</option>
            <option value="armorExotic">Exotic Armor</option>
            <option value="armorMod">Armor Mod</option>
            <option value="weaponPerk">Weapon Perk</option>
            <option value="weaponFrame">Weapon Frame</option>
            <option value="weaponMod">Weapon Mod</option>
         </select>
         <select onChange={(e) => rarityChange(e)}>
            <option value="undefined">Rarity All</option>
            <option value="normal">Rarity Normal</option>
            <option value="exotic">Rarity Exotic</option>
         </select>
         <select>
            <option value="perks id">Perks name</option>
         </select>
      </div>
   )
}
