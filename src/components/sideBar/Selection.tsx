import { itemData_context, setItemData_context } from '@components/provider/dataProvider'
import styles from '@styles/sideBar/Selection.module.scss'
import React, { useContext } from 'react'

type SelectableType = 'none' | 'armorExotic' | 'armorMods' | 'weaponPerks' | 'weaponFrames' | 'weaponMods'

export function Selection() {
   const itemData = useContext(itemData_context)
   const setItemData = useContext(setItemData_context)

   const selectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemData({
         ...itemData,
         inputData: {
            ...itemData.inputData,
            type: e.target.value as SelectableType
         }
      })
   }

   return (
      <div className={styles.selection_list}>
         <select onChange={(e) => selectionChange(e)}>
            <option value="none">Select description type</option>
            <option value="armorExotic">Exotic Armor</option>
            <option value="armorMod">Armor Mod</option>
            <option value="weaponPerk">Weapon Perk</option>
            <option value="weaponFrame">Weapon Frame</option>
            <option value="weaponMod">Weapon Mod</option>
         </select>
         <select name="" id="">
            <option value="undefined">Rarity All</option>
            <option value="normal">Rarity Normal</option>
            <option value="exotic">Rarity Exotic</option>
         </select>
         <select name="" id="">
            <option></option>
         </select>
      </div>
   )
}
