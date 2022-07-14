import React, { useContext, useEffect } from 'react'
import { itemData_context, SelectableType, setItemData_context } from '@components/provider/dataProvider'

import styles from './Selection.module.scss'

export function PerkSelection() {
   const setItemData = useContext(setItemData_context)
   const itemData = useContext(itemData_context)

   const typeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setItemData((draft) => {
         draft.input.type = e.target.value as SelectableType
      })
   }
   const randomEmoji = () => {
      // generates random emoji
      // prettier-ignore
      const emojis = [
         '🍉','🍊','🍌','🍍','🍎','🍏','🍑','🍒','🍓','🍔','🍕','🍖',
         '🍗','🍘','🍙','🍚','🍛','🍜','🍝','🍞','🍟','🍠','🍡','🍢',
         '🍣','🍤','🍥','🍦','🍧','🍨','🍩','🍪','🍫','🍬','🍭','🍮',
         '🍯','🍰','🍱','🍲','🍵','🍶','🍷','🍸','🍹','🍺','🍻','🍾','🍿','🎂'
      ]
      return emojis[Math.floor(Math.random() * emojis.length)]
   }

   const items = () => {
      // filters items in githubData and then sorts them then returns items from selected type as JSX.Element array
      const modifiedDescription = itemData.description.modified
      if (!modifiedDescription) return
      const selectedTypeItems = Object.values(modifiedDescription).flatMap((item) => {
         if (item?.type === itemData.input.type) return item
         return []
      })
      const sortedItems = selectedTypeItems.sort((a, b) =>
         a.itemName && b.itemName ? a.itemName.localeCompare(b.itemName) : a.name.localeCompare(b.name)
      )

      // select first item on type change
      // setItemData((draft) => {
      //    if (sortedItems[0] === undefined) return draft
      //    draft.selectedPerkHash = sortedItems[0].id
      // })
      return sortedItems.map((item, i) => {
         return (
            <option
               key={i}
               value={item.id}
               className={item.visible || itemData.displayHiddenPerks ? undefined : styles.hidden}
            >
               {`${item.itemName || item.name}${item.inLiveDatabase ? `` : ` ${randomEmoji()}`}`}
            </option>
         )
      })
   }

   const itemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      // after item is selected saves item data // that also triggers display update
      const selectedItem = itemData.description.modified?.[e.target.value]?.id
      if (!selectedItem) return
      setItemData((draft) => {
         draft.selectedPerkHash = selectedItem
      })
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
               <option value="artifactMod">Artifact Mod</option>
            </optgroup>
         </select>
         <select onChange={(e) => itemChange(e)}>{items()}</select>
      </div>
   )
}
