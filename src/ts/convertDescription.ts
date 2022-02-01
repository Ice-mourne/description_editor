interface splittedDescription {
   lineText?: string
   table?: { lineText: string }
}

export default function convertDescription(description: string) {
   const data = description.split(/(< table >[^]*?<\$>)/g)
   const splitted = data.reduce((acc: Array<splittedDescription>, curr) => {
      if (curr.startsWith('< table >')) {
         const table = curr.replace('< table >', '').replace('<$>', '')
         const rows = table.split(/\n/)
         const rowsInObject = rows.reduce((acc: any, currentRow) => {
            acc.push({ lineText: currentRow.replace(/\r/g, '') })
            return acc
         }, [])
         acc.push({ table: rowsInObject })
         return acc
      } else {
         const lines = curr.split(/\n/)
         const linesInObject = lines.reduce((acc: any, currentLine) => {
            acc.push({ lineText: currentLine.replace(/\r/g, '') })
            return acc
         }, [])
         acc.push(...linesInObject)
         return acc
      }
   }, [])

   const convertLine = (line: string | undefined) => {

      const regStart = '#(?:primary|special|heavy|pve|pvp|bg|b|highlight_[1-3]|formula)'
      const regEnd = '<\\$>'
      const splittedLine = line?.split(new RegExp(`(${regStart}.*?${regEnd})`, 'g'))
      // console.log(RegExp(`(${regStart}.*?${regEnd})`, 'g'))
      

      const newLine = splittedLine?.reduce((acc: any, curr: string) => {
         if (curr.startsWith('#')) {
            const className = curr.match(new RegExp(regStart, 'g'))?.join(' ').replaceAll('#', '')
            const cleanText = curr.replace(new RegExp(`${regStart}|${regEnd}`, 'g'), '')
            acc.push({
               className: className,
               text: cleanText
            })
         } else {
            if(!curr.trim()) return acc // just to remove empty ones with out className
            acc.push({ text: curr })
         }
         return acc
      }, [])


      
      return { lineText: newLine }
   }

   const completeDescription = splitted.flatMap((line) => {
      if (line.table) {
         return []
      } else {
         return convertLine(line.lineText)
      }
   })

   console.log(completeDescription)
   return completeDescription
}
