import { itemData_context } from '@components/provider/dataProvider'
import { useContext } from 'react'
import { DescriptionBuilder } from './Description'
import styles from './Perks.module.scss'

export function Perks() {
   const itemData = useContext(itemData_context)
   const perkHash = itemData.selectedPerkHash
   const perk = itemData?.description.modified[perkHash]

   const allPerks = []
   for (let i = 0; i < 4; i++) {
      const description = i == 0 ? perk?.description : i == 1 ? perk?.simpleDescription : null

      allPerks.push(
         <div className={styles.perk_list} key={i}>
            {description && (
               <div className={styles.description}>
                  <DescriptionBuilder description={description} />
               </div>
            )}
            <div className={`${styles.perk} ${styles.perk_active}`}>
               <div className={`${styles.icon_container} ${styles.icon_container_active}`}>
                  <img src="https://bungie.net/common/destiny2_content/icons/f2ff6ea4498ad2d808b4af21e93cf5fe.png" />
               </div>
               <div className={`${styles.name} ${styles.name_active}`}>{perk?.name}</div>
            </div>
         </div>
      )
   }

   return <div className={styles.perk_box}>{allPerks}</div>
}
