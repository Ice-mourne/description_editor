import { CellContent, DescriptionLine, ItemDataTemplate, LinesContent } from '@components/provider/dataProvider'
import { selfContainedKeywords } from '@data/ramdomData'
import { Updater } from 'use-immer'
import { descriptionExport, descriptionImport } from './descriptionImportExport'
import { doMath } from './doMath'
import { statImport } from './statImport'
import { setTitle } from './title'
import { loadVariables, saveVariables } from './variableSaveLoad'

const convertLinesContent = (line: string, table: boolean) => {
   const regexStart = '<(?:'
   const selfContained = selfContainedKeywords
   const simpleWrappers = ['bold', 'pve', 'pvp', 'background', 'green', 'blue', 'purple', 'yellow']
   const complexWrappers = ['link', 'title', 'formula']
   const regexEnd = ').*?/>'

   const fullRegex = new RegExp(
      `(${regexStart}${[...selfContained, ...simpleWrappers, ...complexWrappers].join('|')}${regexEnd}|⮬)`,
      'g'
   )

   const splittedLine = line.split(fullRegex).filter((line) => line !== '') // line.trim() !== '')
   return splittedLine.reduce((acc, text) => {
      if (table && /\|/.test(text)) {
         const inCellClasses: { [key: string]: string } = {
            b: 'bold',
            c: 'center',
            h: 'background',
            r: 'right'
         }

         const cellClassNames = text
            .match(/\|[bchr\d-]+/)?.[0]
            .split('')
            .filter((char) => inCellClasses[char] !== undefined)
            .map((c) => inCellClasses[c])

         const span = text.match(/\|([bchr\d-]+)?/)?.[0]?.match(/-\d|\d/g)

         const colSpan = span?.filter((number) => Number(number) > 0)[0]
         const rowSpan = span?.filter((number) => Number(number) < 0)[0] || 0

         acc.push({
            text: text.replace(/\|([bchr\d-]+)?/g, '').trim(),
            cellClassNames,
            colSpan: Number(colSpan) || undefined,
            rowSpan: Math.abs(Number(rowSpan)) || undefined
         })
         return acc
      }

      // if there are no special stuff return text
      if (text.match(fullRegex) === null) {
         acc.push({
            text
         })
         return acc
      }

      if (new RegExp(`${regexStart}${simpleWrappers.join('|')}${regexEnd}`).test(text)) {
         acc.push({
            text: text.replace(new RegExp(`<(${simpleWrappers.join('|')}) | />`, 'g'), ''),
            classNames: [text.match(new RegExp(simpleWrappers.join('|')))![0].trim()]
         })
         return acc
      }

      // if only self contained return relevant class name
      if (new RegExp(`${regexStart}${selfContained.join('|')}${regexEnd}`).test(text)) {
         acc.push({
            classNames: [text.match(new RegExp(selfContained.join('|')))![0].trim()]
         })
         return acc
      }

      if (new RegExp(`${regexStart}${complexWrappers.join('|')}${regexEnd}`).test(text)) {
         const type = text.match(new RegExp(complexWrappers.join('|')))![0].trim()
         acc.push({
            text: text.replace(new RegExp(`<(${complexWrappers.join('|')}) | />|\\[.*?\\]`, 'g'), '').trim(),
            [type]: text
               .match(/\[.*?]/)?.[0]
               .replace(/^\[|]$/g, '')
               .trim(),
            classNames: [type]
         })
         return acc
      }

      if (text === '⮬') {
         acc.push({
            text: '⮬',
            classNames: ['enhancedArrow']
         })
         return acc
      }
      return acc
   }, [] as LinesContent[] | CellContent[])
}

function splitTable(line: string) {
   const center = /<center\/>/.test(line) ? 'center' : undefined
   const bold = /<bold\/>/.test(line) ? 'bold' : undefined
   const background = /<background\/>/.test(line) ? 'background' : undefined

   const cleanLine = line.replace(/(<center\/>)|(<bold\/>)|(<background\/>)/g, '')
   const splittedLine = cleanLine.split(/(\|.+?(?=\|)|\|.+?$)/).filter((line) => line.trim() !== '')

   return {
      classNames: [center, bold, background],
      rowContent: splittedLine.map((text) => {
         const convertLines: CellContent[] = convertLinesContent(text, true)

         const filteredLines = convertLines.filter((line) => {
            return !(
               (line.text === undefined || line.text.trim() === '') &&
               !line.classNames?.some((className) => typeof className === 'string') &&
               !line.cellClassNames?.some((className) => typeof className === 'string')
            )
         })

         let colSpan: number | undefined = undefined
         let rowSpan: number | undefined = undefined
         let cellClassNames: (string | undefined)[] | undefined = undefined

         filteredLines.forEach((line) => {
            if (line.colSpan) colSpan = line.colSpan
            if (line.rowSpan) rowSpan = line.rowSpan
            if (line.cellClassNames) cellClassNames = line.cellClassNames
         })

         return {
            colSpan,
            rowSpan,
            classNames: cellClassNames,
            cellContent: filteredLines
         }
      })
   }
}

export default function convertDescription(
   description: string,
   hash: number,
   itemData: ItemDataTemplate,
   setItemData: Updater<ItemDataTemplate>,
   editorType: string
) {
   // remove \r
   let cleanText = description.replace(/\r/g, '')

   // import 2 times in case imported description has its own imports
   cleanText = descriptionImport(cleanText, hash, itemData)
   cleanText = descriptionImport(cleanText, hash, itemData)
   if (editorType === 'main') {
      const text = setTitle(cleanText, hash, itemData, setItemData, editorType)
      if (text) cleanText = text

      const text2 = saveVariables(cleanText, hash, setItemData)
      if (text2) cleanText = text2

      const text3 = descriptionExport(cleanText, hash, setItemData)
      if (text3) cleanText = text3
   }
   cleanText = statImport(cleanText, hash, setItemData)
   cleanText = loadVariables(cleanText, hash, itemData)
   cleanText = doMath(cleanText)

   // split lines in to array of lines
   const lineArr = cleanText.trim().split('\n')

   let tableIndex: number | null = null
   const parsedDescription = lineArr.reduce((acc, line, lineIndex) => {
      //--- start of table code
      // if line starts with < table // start table stuff
      if (tableIndex === null && /^\s*< table /.test(line)) {
         tableIndex = lineIndex
         const wide = / wide /.test(line) ? 'wide' : undefined
         const centered = / center /.test(line) ? 'centerTable' : undefined
         const formula = / formula /.test(line) ? 'formula' : undefined
         const backgroundOdd = / background_2 /.test(line) ? 'bgOdd' : undefined
         const backgroundEven = / background_1 /.test(line) ? 'bgEven' : undefined
         acc[tableIndex] = {
            classNames: ['table', wide, centered, backgroundOdd, backgroundEven],
            isFormula: formula ? true : undefined,
            table: []
         }
         return acc
      }

      // if line starts with <$> exit table stuff
      if (tableIndex !== null && /^\s*<\$>/.test(line)) {
         tableIndex = null
         return acc
      }

      // while in table
      if (tableIndex !== null) {
         acc[tableIndex].table!.push(splitTable(line))
         return acc
      }
      //--- end of table code

      if (line.trim() === '') {
         acc.push({
            classNames: ['spacer']
         })
         return acc
      }

      const center = /<center\/>/.test(line) ? 'center' : undefined
      const bold = /<bold\/>/.test(line) ? 'bold' : undefined
      const background = /<background\/>/.test(line) ? 'background' : undefined

      const cleanLine = line.replace(/(<center\/>)|(<bold\/>)|(<background\/>)/g, '')
      acc.push({
         classNames: [center, bold, background],
         linesContent: convertLinesContent(cleanLine, false)
      })
      return acc
   }, [] as DescriptionLine[])

   return parsedDescription
}
