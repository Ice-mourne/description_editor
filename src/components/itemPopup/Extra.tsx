import styles from '@styles/itemPopup/Note.module.scss'

export function Note() {
   return (
      <div className={styles.notes}>
         <div className='fas fa-pencil-alt'></div>
         <div className='text'>Add a note</div>
      </div>
   )
}
