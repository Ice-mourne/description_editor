function stat_display(weaponType: string) {
   switch (weaponType) {
      case 'Auto Rifle':
      case 'Hand Cannon':
      case 'Pulse Rifle':
      case 'Scout Rifle':
      case 'Shotgun':
      case 'Sniper Rifle':
      case 'Submachine Gun':
      case 'Machine Gun':
         return [
            4284893193, // Rounds Per Minute
            4043523819, // Impact
            1240592695, // Range
            155624089, // Stability
            943549884, // Handling
            4188031367, // Reload Speed
            1345609583, // Aim Assistance
            3555269338, // Zoom
            2715839340, // Recoil Direction
            3871231066 // Magazine
            // 'range',
            // 'reload'
         ]
      case 'Fusion Rifle':
      case 'Linear Fusion Rifle':
         return [
            2961396640, // Charge Time
            4043523819, // Impact
            1240592695, // Range
            155624089, // Stability
            943549884, // Handling
            4188031367, // Reload Speed
            1345609583, // Aim Assistance
            3555269338, // Zoom
            2715839340, // Recoil Direction
            3871231066 // Magazine
            // 'range',
            // 'reload'
         ]
      case 'Rocket Launcher':
      case 'Grenade Launcher':
         return [
            3611281802, // Blast Radius
            2523465841, // Velocity
            155624089, // Stability
            943549884, // Handling
            4188031367, // Reload Speed
            1345609583, // Aim Assistance
            3555269338, // Zoom
            2715839340, // Recoil Direction
            3871231066 // Magazine
            // 'reload'
         ]
      case 'Combat Bow':
         return [
            447667954, // Draw Time
            4043523819, // Impact
            1591432999, // Accuracy
            1556424089, // Stability
            943549884, // Handling
            4188031367, // Reload Speed
            1345609583, // Aim Assistance
            3555269338, // Zoom
            2715839340, // Recoil Direction
            1931675084 // Inventory Size
            // 'reload'
         ]
      case 'Sword':
         return [
            2837207746, // Swing Speed
            4043523819, // Impact
            2762071195, // Guard Efficiency
            209426660, // Guard Resistance
            3022301683, // Charge Rate
            3736848092, // Guard Endurance
            925767036 // Ammo Capacity
         ]
   }
}
// prettier-ignore
const statInfo = {
   4284893193: { statBarPlace: null,       name: 'Rounds Per Minute' },
   447667954:  { statBarPlace: 'ms',       name: 'Draw Time'         },
   2961396640: { statBarPlace: 'ms',       name: 'Charge Time'       },
   2837207746: { statBarPlace: 'stat_bar', name: 'Swing Speed'       },
   4043523819: { statBarPlace: 'stat_bar', name: 'Impact'            },
   3614673599: { statBarPlace: 'stat_bar', name: 'Blast Radius'      },
   1591432999: { statBarPlace: 'stat_bar', name: 'Accuracy'          },
   2523465841: { statBarPlace: 'stat_bar', name: 'Velocity'          },
   2762071195: { statBarPlace: 'stat_bar', name: 'Guard Efficiency'  },
   209426660:  { statBarPlace: 'stat_bar', name: 'Guard Resistance'  },
   1240592695: { statBarPlace: 'stat_bar', name: 'Range'             },
   155624089:  { statBarPlace: 'stat_bar', name: 'Stability'         },
   943549884:  { statBarPlace: 'stat_bar', name: 'Handling'          },
   4188031367: { statBarPlace: 'stat_bar', name: 'Reload Speed'      },
   1345609583: { statBarPlace: 'stat_bar', name: 'Aim Assistance'    },
   3555269338: { statBarPlace: 'stat_bar', name: 'Zoom'              },
   2715839340: { statBarPlace: 'stat_svg', name: 'Recoil Direction'  },
   3022301683: { statBarPlace: 'stat_bar', name: 'Charge Rate'       },
   3736848092: { statBarPlace: 'stat_bar', name: 'Guard Endurance'   },
   3871231066: { statBarPlace: null,       name: 'Magazine'          },
   1931675084: { statBarPlace: null,       name: 'Inventory Size'    },
   925767036:  { statBarPlace: null,       name: 'Ammo Capacity'     }
}

type PossibleStats =
   | 4284893193
   | 447667954
   | 2961396640
   | 2837207746
   | 4043523819
   | 3614673599
   | 1591432999
   | 2523465841
   | 2762071195
   | 209426660
   | 1240592695
   | 155624089
   | 943549884
   | 4188031367
   | 1345609583
   | 3555269338
   | 2715839340
   | 3022301683
   | 3736848092
   | 3871231066
   | 1931675084
   | 925767036

const testData = {
   perks: {
      155624089: 29.8,
      943549884: 55,
      1240592695: 79.3,
      1345609583: 52,
      2715839340: 86,
      3555269338: 20,
      3871231066: 31.6,
      4043523819: 33,
      4188031367: 44.2,
      4284893193: 360
   },
   all: {
      155624089: 30,
      943549884: 55,
      1240592695: 79,
      1345609583: 52,
      2715839340: 86,
      3555269338: 20,
      3871231066: 32,
      4043523819: 33,
      4188031367: 45,
      4284893193: 360
      // range: 36.6,
      // reload: 1.99,
      // handling: null
   },
   mod: {
      155624089: 0,
      943549884: 0,
      1240592695: 0,
      1345609583: 0,
      2715839340: 0,
      3555269338: 0,
      3871231066: 0,
      4043523819: 0,
      4188031367: 0,
      4284893193: 0
   },
   masterwork: {
      155624089: 0,
      943549884: 0,
      1240592695: 0,
      1345609583: 0,
      2715839340: 0,
      3555269338: 0,
      3871231066: 0,
      4043523819: 0,
      4188031367: 0.8999999999999986,
      4284893193: 0
   }
}

import Recoil from '@assets/svg/Recoil'
import styles from '@styles/itemPopup/Stats.module.scss'

export function Stats() {
   const statInfo = {
      4284893193: { statBarPlace: null, name: 'Rounds Per Minute' },
      447667954: { statBarPlace: 'ms', name: 'Draw Time' },
      2961396640: { statBarPlace: 'ms', name: 'Charge Time' },
      2837207746: { statBarPlace: 'stat_bar', name: 'Swing Speed' },
      4043523819: { statBarPlace: 'stat_bar', name: 'Impact' },
      3614673599: { statBarPlace: 'stat_bar', name: 'Blast Radius' },
      1591432999: { statBarPlace: 'stat_bar', name: 'Accuracy' },
      2523465841: { statBarPlace: 'stat_bar', name: 'Velocity' },
      2762071195: { statBarPlace: 'stat_bar', name: 'Guard Efficiency' },
      209426660: { statBarPlace: 'stat_bar', name: 'Guard Resistance' },
      1240592695: { statBarPlace: 'stat_bar', name: 'Range' },
      155624089: { statBarPlace: 'stat_bar', name: 'Stability' },
      943549884: { statBarPlace: 'stat_bar', name: 'Handling' },
      4188031367: { statBarPlace: 'stat_bar', name: 'Reload Speed' },
      1345609583: { statBarPlace: 'stat_bar', name: 'Aim Assistance' },
      3555269338: { statBarPlace: 'stat_bar', name: 'Zoom' },
      2715839340: { statBarPlace: 'stat_svg', name: 'Recoil Direction' },
      3022301683: { statBarPlace: 'stat_bar', name: 'Charge Rate' },
      3736848092: { statBarPlace: 'stat_bar', name: 'Guard Endurance' },
      3871231066: { statBarPlace: null, name: 'Magazine' },
      1931675084: { statBarPlace: null, name: 'Inventory Size' },
      925767036: { statBarPlace: null, name: 'Ammo Capacity' }
   }

   const statsWepCanHave = stat_display('Auto Rifle')
   const statsToDisplay: any[] = []

   statsWepCanHave?.forEach((stat: any, i) => {
      const displayInfo = statInfo[stat as keyof typeof statInfo]

      statsToDisplay.push(
         <div key={`${i}a`} className={styles.name}>
            {displayInfo.name}
         </div>
      )
      statsToDisplay.push(
         <div key={`${i}b`} className={styles.value}>
            {testData.all[stat as keyof typeof testData.all]}
         </div>
      )

      switch (displayInfo.statBarPlace) {
         case 'stat_bar':
            const statPerk = testData.perks[stat as keyof typeof testData.perks]
            const statMod = testData.mod[stat as keyof typeof testData.mod]
            const statMasterwork = testData.masterwork[stat as keyof typeof testData.masterwork]
            statsToDisplay.push(
               <div key={`${i}c`} className={styles.barr}>
                  {statPerk ? <div style={{ width: `${statPerk}%` }}></div> : null}
                  {statMod ? <div style={{ width: `${statMod}%` }}></div> : null}
                  {statMasterwork ? <div style={{ width: `${statMasterwork}%` }}></div> : null}
               </div>
            )
            break
         case 'stat_svg':
            statsToDisplay.push(
               <Recoil key={i + 30} recoilStat={testData.perks[stat as keyof typeof testData.perks]} />
            )
            break
         case 'stat_letter':
            statsToDisplay.push(<div key={`${i}g`}> {displayInfo.statBarPlace}</div>)
         default:
            break
      }
   })

   return (
      <div className={styles.stats}>
         {statsToDisplay}
         add in game stats
      </div>
   )
}
