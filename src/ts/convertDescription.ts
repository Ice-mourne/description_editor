const separateLinesAndTables_new = (description: string): string[] =>
   description
      .replace(/\r/g, '')
      .split(/(< table (?:formula )?>[^]*?<\$>)/g) // separate tables and lines in arrays
      .flatMap((text) => {
         // remove empty lines not including spacers
         if (!text) return []
         // can't use trim because it removes more that one line break
         const cleanerText = text.startsWith('\n') ? text.slice(1) : text
         return cleanerText.endsWith('\n') ? cleanerText.slice(0, -1) : cleanerText
      })

type SplitLines = {
   lines?: string[]
   tableLines?: string[]
}
const splitLines_new = (description: string[]): SplitLines[] =>
   description.map((text) => {
      const isTable = text.startsWith('< table ')
      if (isTable) return { tableLines: text.split(/\n/) }
      return { lines: text.split(/\n/) }
   })

interface LinesWithClassNames {
   lineText?: string
   className?: string
   isFormulaTable?: boolean
   table?: Array<{
      lineText?: string
      className?: string
   }>
}
const assignLineClassNames = (description: SplitLines[]): LinesWithClassNames[] => {
   const assignToLines = (lines: string[]) =>
      lines.map((line) => {
         const regex = new RegExp(/(<center\/>)|(<bold\/>)|(<background\/>)/g),
            className = line.match(regex)?.join(' ').replace(/<|\/>/g, ''),
            cleanText = line.replace(regex, '')
         return {
            lineText: cleanText === '' ? undefined : cleanText,
            className: cleanText == '' ? 'spacer' : className
         }
      })

   const assignToTable = (table: string[]) => {
      const isFormulaTable = table[0].match(/formula/) ? true : false // I'm to lazy to make formulaTable as separate object
      const newTable = table.flatMap((line) => {
         if (line.match(/(< table (?:formula )?>|<\$>)/)) return []
         return assignToLines([line])
      })
      return { table: newTable, className: 'table', formula: isFormulaTable } // I'm to lazy to make formulaTable as separate object
   }

   // using reduce seems to bug out and set acc to undefined
   const newDescription: any = []
   description.forEach((text) => {
      if (text.lines) assignToLines(text.lines).forEach((line) => newDescription.push(line))
      if (text.tableLines) newDescription.push(assignToTable(text.tableLines))
   })
   return newDescription
}

interface SplitTableColumns {
   lineText?: string
   className?: string
   isFormulaTable?: boolean
   table?: Array<{
      lineText?: string[] | null
      className?: string
   }>
}
const splitTableColumns_new = (description: LinesWithClassNames[]): SplitTableColumns[] =>
   description.map((linesTable) => {
      if (!linesTable.table) return linesTable as SplitTableColumns // TS complains because i changed table line text from string to string[]
      const newRows = linesTable.table.map((row) => {
         const reg1 = '(\\|)(?!.*\\|).*', // match from | till end of line
            reg2 = '\\|?.*?(?=\\|)' // match from | till |
         return {
            ...row,
            lineText: row.lineText?.match(new RegExp(`(${reg1})|(${reg2})`, 'g'))
         }
      })
      return {
         ...linesTable,
         table: newRows
      }
   })

import { Description } from 'src/interfaces_2'

const assignTextClassNames = (description: SplitTableColumns[]): Description[] => {
   const convertText = (text: string) => {
      const regStart = [
            text.startsWith('|') ? '(\\||\\|b)\\s*<(?:bold' : '<(?:bold', // this is for table
            'highlight_[1-4]',
            'pve|pvp',
            'link|title|formula',
            'stasis|arc|solar|void',
            'primary|special|heavy',
            'background|center)'
         ].join('|'),
         regEnd = '/>'
      const textArr = text.split(new RegExp(`(${regStart}.*?${regEnd})`, 'g'))

      return textArr.flatMap((text, i, arr) => {
         if (text.trim() === '' || (arr.length > 1 && (text.trim() === '|' || text.trim() === '|b'))) return []
         if (!text.match(/^(<|\|)/)) return { text: text } // check if text starts with < or |
         if (text.trim() === '|') return { text: ' ' } // check if text is empty table cell
         const isFormula = text.includes('<formula')
         const isTitle = text.includes('<title')

         let className = text.match(new RegExp(regStart, 'g'))?.join(' ').replaceAll('<', '') || ''
         let cleanText = text.replace(new RegExp(`${regStart}|${regEnd}`, 'g'), '')

         if (text.startsWith('|')) {
            className = `${className} ${text.startsWith('|b') ? 'bold' : ''}`.replace('|', '').trim()
            cleanText = cleanText.replace(/\|b|\|/g, '').trim()
         }

         const link = text.match(/(https:.+? )|((?<=https:.+? ).*(?=\/>))/g)
         if (link)
            return {
               linkUrl: link?.[0]?.trim(),
               linkText: link?.[1].trim(),
               className: className
            }

         const title = text.match(/\[.*\]/g)
         if (title && isTitle)
            return {
               title: title[0].replace(/[[\]]/g, ''),
               text: cleanText.replace(/\[.*\]/g, '').trim(),
               className: className
            }

         if (isFormula) {
            const formula = cleanText.match(/(ready|stow|range|reload)_\d+/g)?.[0],
               formulaText = cleanText.replace(formula || '', '')
            return {
               formulaText: formulaText.trim(),
               formula: formula?.trim(),
               className: className
            }
         }

         if (!cleanText.trim() && !className.trim()) return []
         return {
            text: cleanText,
            className: className
         }
      })
   }

   const convertTable = (table: Array<{ lineText?: string[] | null; className?: string }>) =>
      table.map((row) => {
         const newRow = row.lineText?.flatMap((text) => {
            return convertText(text)
         })

         return {
            ...row,
            lineText: newRow
         }
      })

   return description.map((lineTable) => {
      if (lineTable.table)
         return {
            ...lineTable,
            table: convertTable(lineTable.table)
         }

      if (!lineTable.lineText) return lineTable // if line has no text, return it
      return {
         ...lineTable,
         lineText: convertText(lineTable.lineText)
      }
   }) as Description[] // Because TS complains about lineText conversion
}

export default function convertDescription(description: string) {
   const step1 = separateLinesAndTables_new(description)
   const step2 = splitLines_new(step1)
   const step3 = assignLineClassNames(step2)
   const step4 = splitTableColumns_new(step3)
   const step5 = assignTextClassNames(step4)
   return step5
}
