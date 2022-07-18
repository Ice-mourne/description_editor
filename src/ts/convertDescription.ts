import { Description, ItemDataTemplate, LinesContent } from '@components/provider/dataProvider'
import { Updater } from 'use-immer'
import { descriptionExport, descriptionImport } from './descriptionImportExport'
import { doMath } from './doMath'
import { statImport } from './statImport'
import { setTitle } from './title'
import { loadVariables, saveVariables } from './variableSaveLoad'

const convertLinesContent = (line: string, table: boolean) => {
   const regexStart = '<(?:'
   const selfContained = [
      'stasis',
      'arc',
      'solar',
      'void',
      'primary',
      'special',
      'heavy',
      'barrier',
      'overload',
      'unstoppable'
   ]
   const simpleWrappers = ['bold', 'pve', 'pvp', 'background', 'green', 'blue', 'purple', 'yellow']
   const complexWrappers = ['link', 'title', 'formula']
   const regexEnd = ').*?/>'

   const fullRegex = new RegExp(
      `(${regexStart}${[...selfContained, ...simpleWrappers, ...complexWrappers].join('|')}${regexEnd})`,
      'g'
   )

   const splittedLine = line.split(fullRegex).filter((line) => line !== '') // line.trim() !== '')
   return splittedLine.reduce((acc, text) => {
      if (table && /\|/.test(text)) {
         const classes: { [key: string]: string } = {
            b: 'bold',
            c: 'center',
            h: 'background',
            r: 'right'
         }

         const classNames = text
            .match(/\|[bchr]+/)?.[0]
            .split('')
            .map((c) => classes[c])

         const test = {
            text: text.replace(/\|([bchr]+)?/g, '').trim(),
            classNames
         }

         acc.push(test)
         return acc
      }

      // if there are no special stuff return text
      if (text.match(fullRegex) === null) {
         acc.push({
            text
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

      if (new RegExp(`${regexStart}${simpleWrappers.join('|')}${regexEnd}`).test(text)) {
         acc.push({
            text: text.replace(new RegExp(`<(${simpleWrappers.join('|')}) | />`, 'g'), ''),
            classNames: [text.match(new RegExp(simpleWrappers.join('|')))![0].trim()]
         })
         return acc
      }

      if (new RegExp(`${regexStart}${complexWrappers.join('|')}${regexEnd}`).test(text)) {
         const type = text.match(new RegExp(complexWrappers.join('|')))![0].trim()

         acc.push({
            text: text.replace(new RegExp(`<(${complexWrappers.join('|')}) | />|\\[.*?\\]`, 'g'), '').trim(),
            [type]: text.match(/\[.*?]/)?.[0].replace(/^\[|]$/g, '').trim(),
            classNames: [type]
         })
         return acc
      }
      return acc
   }, [] as LinesContent[])
}

function splitTable(line: string) {
   const center = /<center\/>/.test(line) ? 'center' : undefined
   const bold = /<bold\/>/.test(line) ? 'bold' : undefined
   const background = /<background\/>/.test(line) ? 'background' : undefined

   const cleanLine = line.replace(/(<center\/>)|(<bold\/>)|(<background\/>)/g, '')
   const splittedLine = cleanLine.split(/(\|.+?(?=\|)|\|.+?$)/).filter((line) => line.trim() !== '')

   return {
      classNames: [center, bold, background],
      linesContent: splittedLine.flatMap((text) => {
         const convertLines = convertLinesContent(text, true)
         if (convertLines.length === 1) return convertLines

         return convertLines.reduce<LinesContent>((acc, line) => {
            if (line.classNames) acc.classNames!.push(...line.classNames)
            if (line.text) acc.text = `${acc.text}${line.text}`
            if (line.link) acc.link = line.link
            if (line.formula) acc.text = line.formula
            if (line.title) acc.text = line.title
            return acc
         }, {
            text: '',
            classNames: []
         })
      })
   }
}

export default function convertDescription(
   description: string,
   hash: number,
   itemData: ItemDataTemplate,
   setItemData: Updater<ItemDataTemplate>,
   editorType: string,
) {
   // remove \r
   let cleanText = description.replace(/\r/g, '')

   if (editorType === 'main') {
      const text = setTitle(cleanText, hash, itemData, setItemData, editorType)
      if (text) cleanText = text

      const text2 = descriptionExport(cleanText, hash, setItemData)
      if (text2) cleanText = text2

      const text3 = saveVariables(cleanText, hash, setItemData)
      if (text3) cleanText = text3
   }
   cleanText = statImport(cleanText, hash, setItemData)
   cleanText = descriptionImport(cleanText, hash, itemData)
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
   }, [] as Description[])

   return parsedDescription
}
