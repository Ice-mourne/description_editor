import { ItemDataTemplate } from '@components/provider/dataProvider'
import { Updater } from 'use-immer'
import { descriptionExport, descriptionImport } from '../descriptionImportExport'
import { doMath } from '../doMath'
import { statImport } from '../statImport'
import { setTitle } from '../title'
import { loadVariables, saveVariables } from '../variableSaveLoad'

const crayon: { [key: string]: string[] } = {
   stasis: ['<:stasis:915198000727461909>', ''],
   arc: ['<:arc:720178925317128243>', ''],
   solar: ['<:solar:720178909361995786>', ''],
   void: ['<:void:720178940240461864>', ''],
   primary: ['<:primary:968793055677251604>', ''],
   special: ['<:special:968793055631114330>', ''],
   heavy: ['<:heavy:968793055652106320>', ''],
   barrier: ['', ''],
   overload: ['', ''],
   unstoppable: ['', ''],
   warlock: ['', ''],
   hunter: ['', ''],
   titan: ['', ''],

   pve: ['<:pve:922884406073507930>', ''],
   pvp: ['<:pvp:922884468275019856>', ''],

   background: ['**', '**'],
   bold: ['**', '**'],

   link: ['[', ']', '(', ')'],
   title: ['', '', '', '']
}

const convertLinesContent = (line: string) => {
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

   const splittedLine = line.split(fullRegex).filter((line) => line !== '')
   return splittedLine
      .reduce((acc, text) => {
         // if there are no special stuff return text
         if (text.match(fullRegex) === null) {
            acc.push(text)
            return acc
         }

         // if only self contained return relevant class name
         if (new RegExp(`${regexStart}${selfContained.join('|')}${regexEnd}`).test(text)) {
            const type = text.match(new RegExp(selfContained.join('|')))![0]
            acc.push(crayon[type][0])
            return acc
         }

         if (new RegExp(`${regexStart}${simpleWrappers.join('|')}${regexEnd}`).test(text)) {
            const type = text.match(new RegExp(simpleWrappers.join('|')))![0]
            acc.push(
               [
                  `${crayon[type][0]}`,
                  `${text.replace(new RegExp(`<(${simpleWrappers.join('|')}) | />`, 'g'), '')}`
               ].join('')
            )
            return acc
         }

         if (new RegExp(`${regexStart}${complexWrappers.join('|')}${regexEnd}`).test(text)) {
            const type = text.match(new RegExp(complexWrappers.join('|')))![0].trim()

            acc.push(
               [
                  `${crayon[type][0]}`,
                  `${text.replace(new RegExp(`<(${complexWrappers.join('|')}) | />|\\[.*?\\]`, 'g'), '')}`,
                  `${crayon[type][1]}`,
                  `${crayon[type][2]}`,
                  `${type === 'title' ? '' : text.match(/\[.*?]/)?.[0].replace(/^\[|]$/g, '')}`,
                  `${crayon[type][4]}`
               ].join('')
            )
            return acc
         }
         return acc
      }, [] as string[])
      .join('')
}

export default function convertDescription_Crayon(
   description: string,
   itemData: ItemDataTemplate,
   setItemData: Updater<ItemDataTemplate>,
   editorType: string
) {
   // remove \r
   let cleanText = description.replace(/\r/g, '')

   if (editorType === 'main') {
      const text = setTitle(cleanText, itemData, setItemData, editorType)
      if (text) cleanText = text

      const text2 = descriptionExport(cleanText, setItemData)
      if (text2) cleanText = text2

      const text3 = saveVariables(cleanText, setItemData)
      if (text3) cleanText = text3
   }
   cleanText = statImport(cleanText, setItemData)
   cleanText = descriptionImport(cleanText, itemData)
   cleanText = loadVariables(cleanText, itemData)
   cleanText = doMath(cleanText)

   // remove tables
   cleanText = cleanText.replace(/< table [\s\S]+?<\$>/g, '')
   // remove formulas
   cleanText = cleanText.replace(/<formula .+?\/>/g, '')

   // remove spaces at start end end of description
   cleanText = cleanText.trim()

   // split lines in to array of lines
   const lineArr = cleanText.split('\n')

   let tableIndex: number | null = null
   const parsedDescription = lineArr.reduce((acc, line, lineIndex) => {
      //--- start of table code
      // if line starts with < table // start table stuff
      if (tableIndex === null && /^\s*< table /.test(line)) {
         tableIndex = lineIndex
         return acc
      }

      // if line starts with <$> exit table stuff
      if (tableIndex !== null && /^\s*<\$>/.test(line)) {
         tableIndex = null
         return acc
      }

      // while in table
      if (tableIndex !== null) {
         return acc
      }
      //--- end of table code

      if (line.trim() === '') {
         acc.push('\n')
         return acc
      }

      const bold = /<bold\/>/.test(line) ? 'bold' : null
      const background = /<background\/>/.test(line) ? 'background' : null

      const cleanLine = line.replace(/(<center\/>)|(<bold\/>)|(<background\/>)/g, '')
      acc.push(bold || background ? `**${convertLinesContent(cleanLine)}**` : convertLinesContent(cleanLine))
      return acc
   }, [] as string[])

   const newDescription = parsedDescription.join('\n').replace(/\n\n\n+/g, '\n\n')

   // @ts-ignore
   if (window?.logCustom === 'crayon') console.log(newDescription)

   return parsedDescription
}
