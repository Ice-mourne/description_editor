import React, { useContext } from 'react'
import { itemData_context, setItemData_context } from '@components/provider/dataProvider'

import { SelectableType } from 'src/interfaces_2'
import styles from '@styles/sideBar/Selection.module.scss'

export function Selection() {
   const setItemData = useContext(setItemData_context)
   const itemData = useContext(itemData_context)

   const typeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // saves selected item type to itemData.inputData.type
      setItemData((itemData) => ({
         ...itemData,
         inputData: {
            ...itemData.inputData,
            type: e.target.value as SelectableType
         }
      }))
   }
   const randomEmoji = () => {
      // generates random emoji
      const emojis = [
         '🍉', '🍊', '🍌', '🍍', '🍎', '🍏', '🍑', '🍒', '🍓', '🍔',
         '🍕', '🍖', '🍗', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍞',
         '🍟', '🍠', '🍡', '🍢', '🍣', '🍤', '🍥', '🍦', '🍧', '🍨',
         '🍩', '🍪', '🍫', '🍬', '🍭', '🍮', '🍯', '🍰', '🍱', '🍲',
         '🍵', '🍶', '🍷', '🍸', '🍹', '🍺', '🍻', '🍾', '🍿', '🎂'
      ]
      return emojis[Math.floor(Math.random()*emojis.length)]
   }

   const items = () => {
      // filters items in githubData and then sorts them then returns items from selected type as JSX.Element array
      // runs after typeChange()
      if (!itemData.dataFromGithub) return
      const selectedTypeItems = Object.values(itemData.dataFromGithub).flatMap((item) => {
         if (item.type === itemData.inputData.type) return item
         return []
      })
      const sortedItems = selectedTypeItems.sort((a, b) =>
         a.itemName && b.itemName ? a.itemName.localeCompare(b.itemName) : a.name.localeCompare(b.name)
      )
      return sortedItems.map((item, i) => {
         return (
            <option key={i} value={item.id}>
               {`${item.itemName || item.name}${!item.notInLiveDatabase ? `${randomEmoji()}` : ''}`}
            </option>
         )
      })
   }

   const itemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // after item is selected saves item data // that also triggers display update
      const selectedItem = itemData.dataFromGithub?.[e.target.value]
      if (!selectedItem) return
      setItemData((itemData) => ({
         ...itemData,
         ItemData: {
            id: selectedItem.id,
            name: selectedItem.name,
            itemId: selectedItem.itemId,
            itemName: selectedItem.itemName,
            lastUpdate: new Date(selectedItem.lastUpdate).toLocaleString(),
            updatedBy: selectedItem.updatedBy,
            stats: selectedItem.stats
         },
         dataFromEditor: {
            converted: {
               mainEditor: selectedItem.description,
               secondaryEditor: selectedItem.simpleDescription
            },
            original: selectedItem.editor
         }
      }))
   }

   return (
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
   )
}
