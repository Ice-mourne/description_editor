import styles from '@styles/itemPopup/Sockets.module.scss'

export function Sockets() {
   return (
      <div className={styles.item_sockets}>
         <img className={styles.frame_img} src='https://www.bungie.net/common/destiny2_content/icons/0ce2f3a9046c3b1e2fc007d903563e66.png'/>
         <div className={styles.frame_info}>
            <div>Shadow Frame</div>
            <div>420 rpm / 69 impact</div>
         </div>
         <div className={styles.sockets}>
            <div>
               <img src="https://www.bungie.net/common/destiny2_content/icons/aeacc06cbe147ec400a10225a4dcd504.png"/>
            </div>
            <div>
               <img src="https://www.bungie.net/common/destiny2_content/icons/4e3573080845b4ee9efcb000d4924cb0.jpg"/>
            </div>
            <div className={styles.masterwork_img}>
               <img src="https://www.bungie.net/common/destiny2_content/icons/8ebd558417d6c02e3ed2ffadc4bdbc48.jpg"/>
               <img src="https://www.bungie.net/common/destiny2_content/icons/5c935649e5d3e72c967d6b20c3e44e85.png"/>
            </div>
         </div>
      </div>
   )
}