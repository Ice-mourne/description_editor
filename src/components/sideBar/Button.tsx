import { github } from '@ts/fetch'
import styles from '@styles/sideBar/Button.module.scss'

type button = { data: string; buttonPress?: (e: React.MouseEvent<HTMLButtonElement>) => void }
export function Button({ data, buttonPress }: button) {
   return (
      <button className={styles.fetch_button} onClick={buttonPress}>
         {data}
      </button>
   )
}
