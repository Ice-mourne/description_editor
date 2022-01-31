const rolledPerks = [[839105230, 1392496348], [1431678320, 1087426260], [2779035018], [4082225868]]

const activePerks = [1392496348, 1431678320, 2779035018, 4082225868]

import {Description} from './Description'
import styles from '@styles/itemPopup/Perks.module.scss'

export function Perks() {
   let text = '23'
   const perkList = (perkId: number, index: number) => {
      const classes = activePerks.includes(perkId)
         ? {
              // active perks
              perk: `${styles.perk} ${styles.perk_active}`,
              img: `${styles.icon_container} ${styles.icon_container_active}`,
              name: `${styles.name} ${styles.name_active}`
           }
         : {
              // default non active perks
              perk: styles.perk,
              img: styles.icon_container,
              name: styles.name
           }

      const handleClick = () => {
         text = 'perk description'
      }

      return (
         <div className={classes.perk} onClick={handleClick} key={index}>
            <div className={classes.img}>
               <img src="https://www.bungie.net/common/destiny2_content/icons/c9439f5d740d017dc9551a60a902c797.png" />
            </div>
            <div className={classes.name}>Confined Launch</div>
         </div>
      )
   }

   return (
      <div className={styles.perk_box}>
         {rolledPerks.map((perkListArr, index) => {
            return (
               <div className={styles.perk_list} key={index}>
                  <div className={styles.description}>
                     <Description />
                  </div>
                  {perkListArr.map(perkList)}
               </div>
            )
         })}
      </div>
   )
}
