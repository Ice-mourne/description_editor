import { itemData_context, setItemData_context } from '@components/provider/dataProvider'
import { useContext, useEffect, useState } from 'react'

import { ItemDataTemplate } from 'src/interfaces_2'
import styles from '@styles/sideBar/StatSelection.module.scss'

export function StatSelection() {
   const [selectedStats, setSelectedStats] = useState<{ [key: string]: { [key: string]: boolean } }>({})
   const setItemData = useContext(setItemData_context)
   const itemData = useContext(itemData_context)
   const statList = [
      'range',
      'reload',
      'handling',
      'stability',
      'zoom',
      'aimAssist',
      'chargeDraw',
      'stow',
      'draw',
      'damage'
   ]

   const addRemoveStatInput = (index: number, type: string) =>
      setSelectedStats((stat) => ({
         ...stat,
         [index]: {
            ...stat[index],
            [type]: stat[index]?.[type] ? false : true
         }
      }))

   const filterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      console.log(e)

      if (e.key.match(/[0-9]|[ ,.]|Backspace|Delete|Arrow(Left|Right)/)) return
      if (e.key.match(/[axv]|[zy]/i) && e.ctrlKey) return
      e.preventDefault()
   }

   type activePassive = 'active' | 'passive'
   const addStatInput = (
      e: React.ChangeEvent<HTMLInputElement>,
      activePassive: activePassive,
      multiStat: string,
      nameIndex: number
   ) => {
      const statValues = (itemData: ItemDataTemplate) => ({
         ...itemData.ItemData.stats?.[statList[nameIndex]],
         [activePassive]: {
            ...itemData.ItemData.stats?.[statList[nameIndex]]?.[activePassive],
            [multiStat]: e.target.value
         }
      })

      setItemData((itemData) => ({
         ...itemData,
         ItemData: {
            ...itemData.ItemData,
            stats: {
               ...itemData.ItemData.stats,
               [statList[nameIndex]]: statValues(itemData)
            }
         }
      }))
   }

   useEffect(() => {
      setSelectedStats(() => ({}))
      if (!itemData.ItemData.stats) return
      Object.entries(itemData.ItemData.stats).forEach(([stat, statValue]) => {
         const statIndex = statList.indexOf(stat)
         setSelectedStats((stat) => ({
            ...stat,
            [statIndex]: {
               active: statValue.active ? true : false,
               passive: statValue.passive ? true : false
            }
         }))
      })
   }, [itemData.ItemData.id])

   type statMulti = 'stat' | 'multiplier'
   const newValue = (statName: string, passiveActive: activePassive, statMulti: statMulti) => {
      const stat = itemData.ItemData.stats?.[statName]?.[passiveActive]?.[statMulti]
      if (typeof stat == 'string') return stat
      if (stat) return stat.join(', ')
      return ''
   }

   const fixStatName = (statName: string) => statName.match(/([A-Z][a-z]+)|([a-z]+)/g)?.join(' ')

   const statListTemplate = statList.map((stat, i) => (
      <div className={styles.stat_container} key={i}>
         <div className={styles.buttons}>
            <button
               onClick={() => addRemoveStatInput(i, 'active')}
               className={selectedStats[i]?.active ? styles.active_button : styles.default_button}
            >
               Active
            </button>
            <span className={styles.stat_name}>{fixStatName(stat)}</span>
            <button
               onClick={() => addRemoveStatInput(i, 'passive')}
               className={selectedStats[i]?.passive ? styles.active_button : styles.default_button}
            >
               Passive
            </button>
         </div>

         {selectedStats[i]?.active ? (
            <>
               <div className={styles.stat_name}>Active</div>
               <div className={styles.stat_input}>
                  <span>Stat</span>
                  <input
                     onKeyDown={filterInput}
                     onChange={(e) => addStatInput(e, 'active', 'stat', i)}
                     value={newValue(statList[i], 'active', 'stat')}
                  />
                  <span>Multiplier</span>
                  <input
                     onKeyDown={filterInput}
                     onChange={(e) => addStatInput(e, 'active', 'multiplier', i)}
                     value={newValue(statList[i], 'active', 'multiplier')}
                  />
               </div>
            </>
         ) : null}

         {selectedStats[i]?.passive ? (
            <>
               <div className={styles.stat_name}>Passive</div>
               <div className={styles.stat_input}>
                  <span>Stat</span>
                  <input
                     onKeyDown={filterInput}
                     onChange={(e) => addStatInput(e, 'passive', 'stat', i)}
                     value={newValue(statList[i], 'passive', 'stat')}
                  />
                  <span>Multiplier</span>
                  <input
                     onKeyDown={filterInput}
                     onChange={(e) => addStatInput(e, 'passive', 'multiplier', i)}
                     value={newValue(statList[i], 'passive', 'multiplier')}
                  />
               </div>
            </>
         ) : null}
      </div>
   ))

   return (
      <>
         <div>{statListTemplate}</div>
      </>
   )
}
