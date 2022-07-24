import * as monaco from 'monaco-editor'

const formatTable = (editorValue: string) => {
   const tables = editorValue.match(/< table( wide| center| formula){0,3}? >[\S\s]+?<\$>/g)
   if (tables === null) return editorValue
   const newTables = tables.map((table) => {
      const tableLines = table.split('\n')

      // find |bc length in every line and get longest columns lengths
      let beginningSpacing: { [key: string]: number } = {}
      let endingSpacing: { [key: string]: number } = {}
      tableLines.forEach((line, index, arr) => {
         if (index === 0) return line
         if (index === arr.length - 1) return line
         const splittedLine = line.split(/(\|.+?(?=\|)|\|.+?$)/).filter((line) => line.trim() !== '')

         // set longest |bch length in every column
         splittedLine.forEach((text, index) => {
            beginningSpacing[index] = Math.max(beginningSpacing[index] || 0, text.match(/\|([bchr\d-]+)?/)![0].length)
         })
      })

      tableLines.forEach((line, index, arr) => {
         if (index === 0) return line
         if (index === arr.length - 1) return line
         const splittedLine = line.split(/(\|.+?(?=\|)|\|.+?$)/).filter((line) => line.trim() !== '')

         // set longest |bch and text length in every column
         splittedLine.forEach((text, index, arr) => {
            // if (index === arr.length - 1) return // skip last column

            const beginning = text.match(/\|([bchr\d-]+)?/)![0]
            const ending = text.replace(beginning, '').trim()

            const textLength = beginningSpacing[index] + ending.length

            endingSpacing[index] = Math.max(endingSpacing[index] || 0, textLength)
         })
      })

      return tableLines
         .map((line, index, arr) => {
            if (index === 0) return line
            if (index === arr.length - 1) return line
            const splittedLine = line.split(/(\|.+?(?=\|)|\|.+?$)/).filter((line) => line.trim() !== '')

            return splittedLine
               .map((text, index) => {
                  const beginning = text.match(/\|([bchr\d-]+)?/)![0]
                  const ending = text.replace(beginning, '').trim()

                  return `${beginning} ${' '.repeat(beginningSpacing[index] - beginning.length)}${ending}${' '.repeat(
                     endingSpacing[index] - ending.length - beginningSpacing[index] + 1
                  )}`
               })
               .join('')
               .trim()
         })
         .join('\n')
   })

   return newTables
      .map((text, i) => {
         return editorValue.replace(tables[i], text)
      })
      .join('')
}

const fixCleanText = (text: string) => {
   const text_1 = text
      .replaceAll('<highlight_1', '<green')
      .replaceAll('<highlight_2', '<yellow')
      .replaceAll('<highlight_3', '<blue')
      .replaceAll('<highlight_4', '<purple')
      .trim()

   const oldTitles = text_1.match(/<title .+?\/>/g)
   if (oldTitles === null) return text_1

   const text_2 = oldTitles.reduce((acc, title) => {
      const titleName = title.match(/(?<=<title).+?(?=\[)/)?.[0].trim()
      const titleText = title.match(/(?<=\[).+?(?=])/)?.[0].trim()

      // change title to new format
      acc = acc.replace(title, `<title ${titleName} [${titleName?.toLocaleLowerCase()}] \/>`)
      // add title content part
      acc = `${acc}\ntitle ${titleName?.toLocaleLowerCase()} (\n${titleText}\n)`

      return acc
   }, text_1)

   return text_2
}

export function editorHotkeys(editor: monaco.editor.IStandaloneCodeEditor) {
   const editorHotKey = (e: KeyboardEvent) => {
      if (e.key === 'Pause') {
         ;('⮬')
      }
      if (e.key !== 'ScrollLock') return
      const newValue = formatTable(editor.getValue())
      const cleanValue = fixCleanText(newValue)
      editor.setValue(cleanValue)
   }
   window.addEventListener('keyup', (e) => editorHotKey(e as KeyboardEvent))
}
