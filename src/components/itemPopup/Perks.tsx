import { Description } from './Description'
import { itemData_context } from '@components/provider/dataProvider'
import styles from '@styles/itemPopup/Perks.module.scss'
import { useContext } from 'react'

export function Perks() {
   const itemData = useContext(itemData_context)

   const allPerks = []
   for (let i = 0; i < 4; i++) {
      const description =
         i == 0
            ? itemData?.dataFromEditor.converted.mainEditor
            : i == 1
            ? itemData?.dataFromEditor.converted.secondaryEditor
            : null

      allPerks.push(
         <div className={styles.perk_list} key={i}>
            {description ? (
               <div className={styles.description}>
                  <Description description={description} />
               </div>
            ) : null}
            <div className={`${styles.perk} ${styles.perk_active}`}>
               <div className={`${styles.icon_container} ${styles.icon_container_active}`}>
                  <img src="https://bungie.net/common/destiny2_content/icons/f2ff6ea4498ad2d808b4af21e93cf5fe.png" />
               </div>
               <div className={`${styles.name} ${styles.name_active}`}>{itemData?.perkData.name}</div>
            </div>
         </div>
      )
   }

   return <div className={styles.perk_box}>{allPerks}</div>
}
