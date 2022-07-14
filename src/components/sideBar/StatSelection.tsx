import { itemData_context, setItemData_context } from '@components/provider/dataProvider'
import { useContext, useEffect } from 'react'

import styles from './StatSelection.module.scss'
import { createNestedObject } from '@utils/createNestedObject'
import { statsArrayToString, statsStringToArray } from '@utils/statsToStringAndBack'
import { useImmer } from 'use-immer'

type StatMulti = 'stat' | 'multiplier'
type ActivePassive = 'active' | 'passive'

type ShowHideStats = {
   [key: string]: {
      [key in ActivePassive]: boolean
   }
}

type StatsString = {
   [key: string]: {
      [key in ActivePassive]: {
         [key in StatMulti]: string
      }
   }
}

export function StatSelection() {
   const [showHideStats, setShowHideStats] = useImmer({} as ShowHideStats)
   const [statsString, setStatsString] = useImmer({} as StatsString)
   const setItemData = useContext(setItemData_context)
   const itemData = useContext(itemData_context)
   const selectedPerkHash = itemData.selectedPerkHash
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

   const onShowHideStats = (statIndex: number, activeOrPassiveStat: ActivePassive) =>
      setShowHideStats((draft) => {
         createNestedObject(draft, [statIndex, activeOrPassiveStat], !draft[statIndex]?.[activeOrPassiveStat])
      })

   const filterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key.match(/[0-9]|[ ,.-]|Backspace|Delete|Arrow(Left|Right)/)) return
      if (e.key.match(/[axv]|[zy]/i) && e.ctrlKey) return
      e.preventDefault()
   }

   const onStatChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      activeOrPassiveStat: ActivePassive,
      statMultiplayerOrValue: StatMulti,
      indexOfStatName: number
   ) => {
      setItemData((draft) => {
         createNestedObject(
            draft.description.modified,
            [draft.input.id, 'stats', statList[indexOfStatName], activeOrPassiveStat, statMultiplayerOrValue],
            statsStringToArray(e.target.value)
         )
      })

      setStatsString((draft) => {
         createNestedObject(draft, [indexOfStatName, activeOrPassiveStat, statMultiplayerOrValue], e.target.value)
      })
   }

   // open, close stats on item selection
   useEffect(() => {
      // remove selected stats
      setShowHideStats({})

      const stats = itemData.description.modified[selectedPerkHash]?.stats
      if (!stats) return

      Object.entries(stats).forEach(([stat, statValue]) => {
         const statIndex = statList.indexOf(stat)
         setShowHideStats((draft) => {
            draft[statIndex] = {
               active: Boolean(statValue.active),
               passive: Boolean(statValue.passive)
            }
         })

         setStatsString((draft) => {
            draft[statIndex] = {
               active: {
                  stat: statsArrayToString(statValue.active?.stat),
                  multiplier: statsArrayToString(statValue.active?.multiplier)
               },
               passive: {
                  stat: statsArrayToString(statValue.passive?.stat),
                  multiplier: statsArrayToString(statValue.passive?.multiplier)
               }
            }
         })
      })
   }, [itemData.selectedPerkHash])

   const fixStatName = (statName: string) => statName.match(/([A-Z][a-z]+)|([a-z]+)/g)?.join(' ')

   const statListTemplate = statList.map((stat, i) => (
      <div className={styles.stat_container} key={i}>
         <div className={styles.buttons}>
            <button
               onClick={() => onShowHideStats(i, 'active')}
               className={showHideStats[i]?.active ? styles.active_button : styles.default_button}
            >
               Active
            </button>
            <span className={styles.stat_name}>{fixStatName(stat)}</span>
            <button
               onClick={() => onShowHideStats(i, 'passive')}
               className={showHideStats[i]?.passive ? styles.active_button : styles.default_button}
            >
               Passive
            </button>
         </div>

         {showHideStats[i]?.active ? (
            <>
               <div className={styles.stat_name}>Active</div>
               <div className={styles.stat_input}>
                  <span>Stat</span>
                  <input
                     onKeyDown={filterInput}
                     onChange={(e) => onStatChange(e, 'active', 'stat', i)}
                     value={statsString[i]?.active?.stat || ''}
                  />
                  <span>Multiplier</span>
                  <input
                     onKeyDown={filterInput}
                     onChange={(e) => onStatChange(e, 'active', 'multiplier', i)}
                     value={statsString[i]?.active?.multiplier || ''}
                  />
               </div>
            </>
         ) : null}

         {showHideStats[i]?.passive ? (
            <>
               <div className={styles.stat_name}>Passive</div>
               <div className={styles.stat_input}>
                  <span>Stat</span>
                  <input
                     onKeyDown={filterInput}
                     onChange={(e) => onStatChange(e, 'passive', 'stat', i)}
                     value={statsString[i]?.passive?.stat || ''}
                  />
                  <span>Multiplier</span>
                  <input
                     onKeyDown={filterInput}
                     onChange={(e) => onStatChange(e, 'passive', 'multiplier', i)}
                     value={statsString[i]?.passive?.multiplier || ''}
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