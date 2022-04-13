import { ItemWithEditor, SelectableType } from 'src/interfaces_2'
import { itemData_context, setItemData_context } from '@components/provider/dataProvider'
import { useContext, useState } from 'react'

import XMark from '@assets/svg/XMark'
import styles from '@styles/sideBar/Selection.module.scss'

export function PerkLinking() {
   const setItemData = useContext(setItemData_context)
   const itemData = useContext(itemData_context)

   const [selectedType, setSelectedType] = useState<SelectableType | undefined>(undefined)
   const [selectedPerk, setSelectedPerk] = useState('')
   const [linkedPerks, setLinkedPerks] = useState<Set<ItemWithEditor | undefined>>(new Set())

   const typeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // saves selected item type to itemData.inputData.type
      setSelectedType(e.target.value as SelectableType)
   }

   const items = () => {
      // filters items in githubData and then sorts them then returns items from selected type as JSX.Element array
      // runs after typeChange()
      if (!itemData.dataFromGithub) return
      const selectedTypeItems = Object.values(itemData.dataFromGithub).flatMap((item) => {
         if (item.type === selectedType) return item
         return []
      })
      const sortedItems = selectedTypeItems.sort((a, b) =>
         a.itemName && b.itemName ? a.itemName.localeCompare(b.itemName) : a.name.localeCompare(b.name)
      )
      return sortedItems.map((item, i) => {
         return (
            <option key={i} value={item.id}>
               {item.itemName || item.name}
            </option>
         )
      })
   }

   const itemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // saves selected item to itemData.inputData.item
      setSelectedPerk(e.target.value)
   }

   const addPerk = () => {
      setLinkedPerks((set) => new Set(set.add(itemData.dataFromGithub?.[selectedPerk])))
   }

   const removePerk = (perk: ItemWithEditor | undefined) => {
      setLinkedPerks((linkedPerks) => {
         linkedPerks.delete(perk)
         return new Set(linkedPerks)
      })
   }

   const fixTypeName = (name: string | undefined) => {
      const spliced = name
         ?.match(/\w+?(?=[A-Z])|[A-Z]\w+/g)
         ?.map((word) => word.toUpperCase())
         .join(' ')
      if (!spliced) return name
      return spliced[0].toUpperCase() + spliced.slice(1).toLowerCase()
   }

   return (
      <>
         <div className={styles.selection_list}>
            <select onChange={(e) => typeChange(e)}>
               <option>Select description type</option>

               <optgroup label="Armor">
                  <option value="armorExotic">Exotic</option>
                  <option value="armorMod">Mod</option>
               </optgroup>

               <optgroup label="Exotic Weapon">
                  <option value="weaponPerkExotic">Perk</option>
                  <option value="weaponFrameExotic">Frame</option>
                  <option value="weaponCatalystExotic">Catalyst</option>
               </optgroup>

               <optgroup label="Weapon">
                  <option value="weaponPerk">Perk</option>
                  <option value="weaponPerkEnhanced">Enhanced Perk</option>
                  <option value="weaponOriginTrait">Origin Trait</option>
                  <option value="weaponFrame">Frame</option>
                  <option value="weaponMod">Mod</option>
               </optgroup>

               <optgroup label="Other">
                  <option value="ghostMod">Ghost Mod</option>
               </optgroup>
            </select>
            <select onChange={(e) => itemChange(e)}>{items()}</select>
         </div>
         <button className={styles.button} onClick={addPerk}>
            Link With Perk still WIP
         </button>
         <div>Linked With</div>
         <div>
            {Array.from(linkedPerks).map((perk, i) => (
               <div key={i}>
                  <div>{`${fixTypeName(perk?.type)} - ${perk?.itemName || perk?.name}`}</div>
                  <div onClick={() => removePerk(perk)}>
                     <XMark />
                  </div>
               </div>
            ))}
         </div>
      </>
   )
}
