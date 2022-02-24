import { itemData_context } from '@components/provider/dataProvider'
import styles from '@styles/sideBar/Message.module.scss'
import { useContext } from 'react'

export function Message() {
   const itemData = useContext(itemData_context)
   return <div className={styles.message} id="message">{itemData.message}</div>
}