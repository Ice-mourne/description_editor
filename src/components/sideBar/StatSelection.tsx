import styles from '@styles/sideBar/StatSelection.module.scss'
import { useState } from 'react'

export function StatSelection() {
   const [selectedStats, setSelectedStats] = useState<any[]>([])

   const addRemoveActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) =>
      setSelectedStats((stat) => ({
         ...stat,
         [index]: {
            ...stat[index],
            active: stat[index].active ? false : true
         }
      }))
   const addRemovePassive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) =>
      setSelectedStats((stat) => ({
         ...stat,
         [index]: {
            ...stat[index],
            passive: stat[index].passive ? false : true
         }
      }))

   const statList = ['range', 'reload', 'handling', 'stow', 'draw']
   const statListTemplate = statList.map((stat, i) => (
      <div className={styles.stat_container} key={i}>
         <div className={styles.buttons}>
            <button onClick={(e) => addRemoveActive(e, i)}>Add Active</button>
            <span className={styles.stat_name}>{stat}</span>
            <button onClick={(e) => addRemovePassive(e, i)}>Add Passive</button>
         </div>

         {selectedStats[i]?.passive ? (
            <>
               <div className={styles.stat_name}>Passive</div>
               <div className={styles.stat_input}>
                  <span>Stat</span>
                  <input />
                  <span>Multiplier</span>
                  <input />
               </div>
            </>
         ) : null}

         {selectedStats[i]?.active ? (
            <>
               <div className={styles.stat_name}>Active</div>
               <div className={styles.stat_input}>
                  <span>Stat</span>
                  <input />
                  <span>Multiplier</span>
                  <input />
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
