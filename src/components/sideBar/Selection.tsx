import styles from '@styles/sideBar/Selection.module.scss'

export function Selection({ changeEvent }: { changeEvent: (e: React.ChangeEvent<HTMLSelectElement>) => void }) {
   return (
      <div className={styles.selection_list}>
         <select onChange={(e) => changeEvent(e)}>
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
