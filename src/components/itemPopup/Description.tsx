const description = [
   {
      lineText: [
         {
            text: 'Upon dealing Melee Damage while an Enemy is within 15 meters:'
         }
      ]
   },
   {
      lineText: [
         {
            text: '100 Handling and '
         },
         {
            textClass: 'CDB-pve',
            text: ' 500%'
         },
         {
            textClass: 'CDB-pvp',
            text: ' [100%]'
         },
         {
            text: ' increased damage for 10 seconds or until firing.'
         }
      ]
   },
   {
      lineText: [
         {
            text: '4 second cooldown. Can be procced while stowed.'
         }
      ]
   },
   {
      lineClass: 'CDB-spacer'
   },
   {
      lineText: [
         {
            text: 'Any Powered Melee which requires sprinting, sliding, or a sprinting jump to utilize will not activate Blunt Execution Rounds.',
            title: 'Blunt Execution Rounds'
         }
      ]
   },
   {
      lineClass: 'CDB-spacer'
   },
   {
      lineText: [
         {
            formulaText: 'Ready Speed: '
         },
         {
            formula: '{hand_r_0}'
         },
         {
            linkUrl: 'https://www.youtube.com/',
            linkText: 'youtube'
         }
      ]
   },
   {
      lineText: [
         {
            formulaText: 'Stow Speed: '
         },
         {
            formula: '{hand_s_0}'
         }
      ]
   },
   {
      table: [
         {
            lineText: [
               {
                  textClass: 'CDB-bold',
                  text: 'Stacks'
               },
               {
                  textClass: 'CDB-bold',
                  text: 'Reload Speed'
               },
               {
                  textClass: 'CDB-bold',
                  text: 'Reload Animation Length'
               },
               {
                  textClass: 'CDB-bold',
                  formulaText: 'Reload Time'
               }
            ]
         },
         {
            lineClass: 'CDB-bg',
            lineText: [
               {
                  text: '1x'
               },
               {
                  text: '10'
               },
               {
                  text: '1x'
               },
               {
                  formula: '{relo_0}'
               }
            ]
         },
         {
            lineText: [
               {
                  text: '2x'
               },
               {
                  text: '45'
               },
               {
                  text: '0.9x'
               },
               {
                  formula: '{relo_1}s'
               }
            ]
         },
         {
            lineClass: 'CDB-bg',
            lineText: [
               {
                  text: '3x'
               },
               {
                  text: '55'
               },
               {
                  text: '0.875x'
               },
               {
                  formula: '{relo_2}s'
               }
            ]
         },
         {
            lineText: [
               {
                  text: '4x'
               },
               {
                  text: '70'
               },
               {
                  text: '0.85x'
               },
               {
                  formula: '{relo_3}s'
               }
            ]
         },
         {
            lineClass: 'CDB-bg',
            lineText: [
               {
                  text: '5x'
               },
               {
                  text: '100'
               },
               {
                  text: '0.8x'
               },
               {
                  formula: '{relo_4}s'
               }
            ]
         }
      ]
   }
]

import styles from '@styles/itemPopup/Description.module.scss'

interface Description {
   lineText?: LineText[]
   lineClass?: string
   table?: Table[]
}

interface LineText {
   text?: string
   textClass?: string
   formulaText?: string
   formula?: string
   title?: string
}

interface Table {
   lineText: LineText[]
   lineClass?: string
}
const calculateStat = (formula: string) => {
   return '6.9s'
}

const otherOptions = (options: any) =>
   options.linkUrl ? <a href={options.linkUrl}>{options.linkText}</a> : calculateStat(options.formula)

export function Description({ itemData }: any) {
   const descriptionLine = (line: Description, i: number) => (
      <div className={styles[line.lineClass as string]} key={i}>
         {line.lineText?.map((text, i) => (
            <span className={styles[text.textClass as string]} title={text.title} key={i}>
               {text.text || text.formulaText || otherOptions(text)}
            </span>
         ))}
      </div>
   )

   const descriptionTable = (table: Table[], i: number) => (
      <div className={styles.table} key={i}>
         {table.map((line, i) => descriptionLine(line, i))}
      </div>
   )
   // console.log(itemData.description)

   const completeDescription = (description: any) => {
      if (!description) return
      return description?.map((description: any, i: number) =>
            description.table ? descriptionTable(description.table, i) : descriptionLine(description, i)
         )
   }

   return (
      <div>
         {completeDescription(itemData.description)}
      </div>
   )
}
