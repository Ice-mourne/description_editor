interface ItemPreview {
   ammo: {
      img: string
      type: string
   }
   breaker: {
      img: string
      type: string
   }
   element: {
      img: string
      type: string
   }
   power: number
   name: string
}

import specialAmmo from '@assets/specialAmmo.png'
import styles from '@styles/itemPopup/Header.module.scss'

export function Header(itemPreview: ItemPreview) {
   const left = (
      <div className={styles.left}>
         <div className={styles.type}>Shadow Rifle</div>
         {itemPreview.ammo.img ? <img className={styles.ammo} src={specialAmmo} /> : null}
         {itemPreview.breaker.img ? <img className={styles.breaker} src={itemPreview.breaker.img} /> : null}
      </div>
   )
   const right = (
      <div className={styles.right}>
         {itemPreview.element?.img ? <img className={styles.element} src={itemPreview.element.img} /> : null}
         <div className={styles.power}>{itemPreview.power}</div>
      </div>
   )

   return (
      <div className={styles.header}>
         <a className={styles.name}>{itemPreview.name}</a>
         <div className={styles.bottom}>
            {left}
            {right}
         </div>
      </div>
   )
}
