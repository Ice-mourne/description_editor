type splittedDescription = {
   lineText?: string
   className?: string
   table?: rowsLines[]
}
type rowsLines = {
   lineText: string
   className?: string
}

type convertedLines = {
   lineText: string[] | null
   className?: string
}

const separateLinesAndTable = (description: string) =>
   description
      .replace(/\r/g, '')
      .split(/(< table >[^]*?<\$>)/g) // separate tables and lines in arrays
      .flatMap((text) => (text ? text : [])) // remove empty lines not including spacers
      // can't use trim because it removes more than we want
      .map((text) => (text.endsWith('\n') ? text.slice(0, -1) : text)) // remove trailing newline
      .map((text) => (text.startsWith('\n') ? text.slice(1) : text)) // remove leading newline

const splitTableColumns = (table: rowsLines[]) =>
   table.reduce((acc: convertedLines[], curr: rowsLines) => {
      const reg1 = '(\\|)(?!.*\\|).*', // match from | till end of line
         reg2 = '\\|?.*?(?=\\|)' // match from | till |
      const splittedRow = curr.lineText.match(new RegExp(`(${reg1})|(${reg2})`, 'g'))
      acc.push({ ...curr, lineText: splittedRow })
      return acc
   }, [])

const splitLines = (description: string) => {
   const isTable = description.startsWith('< table >')
   const cleanDescription = description
      .replace(/(< table >\n)|(\n<\$>)/g, '') // remove table tags if where are any
      .split(/\n/)

   const splitted = cleanDescription.reduce((acc: rowsLines[], currentLine) => {
      const regex = new RegExp(/(<center\/>)|(<bold\/>)|(<background\/>)/g),
         className = currentLine.match(regex)?.join(' ').replace(/<|\/>/g, ''),
         cleanText = currentLine.replace(regex, '')
      acc.push({
         lineText: cleanText,
         className: isTable ? className : cleanText == '' ? 'spacer' : className
      })
      return acc
   }, [])

   if (isTable) return { table: splitTableColumns(splitted), className: 'table' }
   return splitted
}

const convertLine = (line: rowsLines) => {
   const lineText = typeof line === 'string' ? line : line.lineText
   const regStart =
         '<(?:highlight_[1-4]|pve|pvp|bold|link|title|stasis|arc|solar|void|primary|special|heavy|background|center)',
      regEnd = '/>'
   const splittedLine = lineText.split(new RegExp(`(${regStart}.*?${regEnd})`, 'g'))

   const newLine = splittedLine.reduce((acc: any, curr: string) => {
      // TODO: ==============   fix any
      const isTableText = curr.startsWith('|')
      if (curr.startsWith('<') || isTableText) {
         const link = curr.match(/(https:.+? )|((?<=https:.+? ).*(?=\/>))/g),
            title = curr.match(/\[.*\]/g)
         const formula = curr.match(/(ready|stow|range|reload)_\d+/g)?.[0],
            formulaText = formula ? curr.replace(formula, '').replace(/<formula |\/>/g, '') : undefined

         let className = curr.match(new RegExp(regStart, 'g'))?.join(' ').replaceAll('<', ''),
            cleanText = curr.replace(new RegExp(`${regStart}|${regEnd}`, 'g'), '')
         if (isTableText) {
            className = `${className || ''} ${curr.startsWith('|b') ? 'bold' : ''}`.trim()
            cleanText = cleanText.replace(/\|b|\|/g, '').trim()
         }
         acc.push({
            formulaText: formulaText?.replace(/\|b|\|/g, '').trim(),
            formula: formula,

            linkUrl: link?.[0]?.trim(),
            linkText: link?.[1],

            title: title ? title[0].replace(/[[\]]/g, '') : undefined,

            className: className,
            text: link ? undefined : title ? cleanText.replace(/\[.*\]/g, '') : formula ? undefined : cleanText
         })
         return acc
      }

      if (!curr.trim()) return acc // just to remove empty ones with out className
      acc.push({ text: curr })
      return acc
   }, [])

   // text in table should be 1 array but can be more if where are links or highlights
   // this will compress to single array
   const checkTableText = (text: any) => {
      if (text.length == 1) return text
      return text.reduce((acc: any, text: any) => {
         Object.entries(text).forEach(([key, value]) => {
            if (value) acc[key] = `${acc[key] || ''} ${value}`
         })
         return acc
      }, {})
   }

   if (typeof line === 'string') return checkTableText(newLine)
   return { ...line, lineText: newLine }
}

export default function convertDescription(description: string) {
   const tableAndLines = separateLinesAndTable(description)
   const splittedLines = tableAndLines.reduce((acc: Array<splittedDescription>, curr) => {
      if (curr.startsWith('< table >')) {
         acc.push(splitLines(curr) as any) // todo: fix any
         return acc
      } else {
         acc.push(...(splitLines(curr) as any)) // todo: fix any
         return acc
      }
   }, [])

   const completeDescription = splittedLines.map((line) => {
      if (line.table) {
         const table = line.table.map((row: any) => {
            const converted = row.lineText?.map((column: any) => convertLine(column))
            return { ...row, lineText: converted }
         })
         return { ...line, table: table }
      } else {
         return convertLine(line as any) // TODO fix this its not suppose to be as any
      }
   })
   return completeDescription
}
