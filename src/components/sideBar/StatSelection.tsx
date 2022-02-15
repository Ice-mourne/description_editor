import styles from '@styles/sideBar/StatSelection.module.scss'
import { useState } from 'react'

export function StatSelection() {
   const [selectedStats, setSelectedStats] = useState<string[]>([])

   const addRemoveStats = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = e.target.value
      if (selectedStats.includes(selected)) {
         setSelectedStats((stats) => stats.filter((item) => item != selected))
      } else {
         setSelectedStats((stats) => [...stats, selected])
      }
   }
   console.log(selectedStats)

   const statList = selectedStats.map((stat, i) =>
      <div className={styles.stat_container} key={i}>



         <div className={styles.stat_name}>{stat}</div>
         <div className={styles.buttons}>
            <button>Add Active</button>
            <button>Add Passive</button>
            <button>Remove</button>
         </div>

         <div className={styles.stat_name}>Passive</div>


         <div className={styles.stat_input}>
            <span>Stat</span>
            <input />
            <span>Multiplier</span>
            <input />
         </div>







         <div className={styles.stat_name}>{stat} Active</div>
         <div className={styles.stat_input}>
            <span>Stat</span>
            <input />
            <span>Multiplier</span>
            <input />
         </div>
      </div>
   )

   return (
      <>
         <select onChange={(e) => addRemoveStats(e)}>
            <option value="">Select stat</option>
            <option value="range">Range</option>
            <option value="handling">Handling</option>
            <option value="reload">Reload</option>
            <option value="readyStow">Ready Stow</option>
            <option value="ready">Ready</option>
            <option value="stow">Stow</option>
         </select>
         <div>{statList}</div>
      </>
   )
}
