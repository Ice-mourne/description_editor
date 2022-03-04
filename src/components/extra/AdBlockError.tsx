import { itemData_context } from '@components/provider/dataProvider'
import styles from '@styles/extra/AdBlockError.module.scss'
import { useContext } from 'react'

export default function AdBlockError() {
   const itemData = useContext(itemData_context)
   const adBlockError = itemData.message == 'AdBlock Error'

   return adBlockError ? (
      <div className={styles.add_block}>
         <h1>Seems like AdBlock is being stupid and blocking description download.</h1>
         <h2>Please disable AdBlock and try again.</h2>
      </div>
   ) : null
}
