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
            beginningSpacing[index] = Math.max(beginningSpacing[index] || 0, text.match(/\|([bchr]+)?/)![0].length)
         })

         // set longest |bch and text length in every column
         splittedLine.forEach((text, index, arr) => {
            if (index === arr.length - 1) return // skip last column

            const beginning = text.match(/\|([bchr]+)?/)![0]
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
                  const beginning = text.match(/\|([bchr]+)?/)![0]
                  const ending = text.replace(beginning, '').trim()

                  return `${beginning} ${' '.repeat(beginningSpacing[index] - beginning.length)}${ending}${' '.repeat(
                     endingSpacing[index] - ending.length - beginningSpacing[index] + 1
                  )}`
               })
               .join('')
         })
         .join('\n')
   })

   return newTables
      .map((text, i) => {
         return editorValue.replace(tables[i], text)
      })
      .join('')
}

export function editorHotkeys(editor: monaco.editor.IStandaloneCodeEditor) {
   var myCondition1 = editor.createContextKey(/*key name*/ 'myCondition1', /*default value*/ false)

   editor.addCommand(
      monaco.KeyCode.ScrollLock,
      function () {
         const newValue = formatTable(editor.getValue())
         editor.setValue(newValue)
      },
      'myCondition1'
   )

   myCondition1.set(true)
}
