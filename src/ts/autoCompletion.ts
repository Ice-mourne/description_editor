import { ItemDataTemplate } from '@components/provider/dataProvider'
import * as monaco from 'monaco-editor'

export function tableSettings(position: monaco.Position, line: string) {
   let suggestions = []
   const settings = {
      kind: monaco.languages.CompletionItemKind.Text,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
   }
   const range = {
      startLineNumber: position.lineNumber | 1,
      endLineNumber: position.lineNumber,
      startColumn: Math.max(position.column - 1, 9),
      endColumn: position.column
   }
   if (!/center/.test(line))
      suggestions.push({
         label: 'center',
         insertText: 'center',
         ...settings,
         range
      })

   if (!/wide/.test(line))
      suggestions.push({
         label: 'wide',
         insertText: 'wide',
         ...settings,
         range
      })

   if (!/formula/.test(line))
      suggestions.push({
         label: 'formula',
         insertText: 'formula',
         ...settings,
         range
      })
   return suggestions
}

export function selfContained(selfContainedKeywords: string[]) {
   const labels = selfContainedKeywords
   const suggestions = labels.map(
      (label) =>
         ({
            label,
            insertText: `<${label}/>`,
            kind: monaco.languages.CompletionItemKind.Property,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
         } as {
            range: {
               // its stupid but if i provide range it will not work // why stupid because you have to provide range
               startLineNumber: number
               endLineNumber: number
               startColumn: number
               endColumn: number
            }
            kind: monaco.languages.CompletionItemKind
            insertTextRules: monaco.languages.CompletionItemInsertTextRule
            label: string
            insertText: string
         })
   )
   return suggestions
}

// performance what is what???
export function imports(position: monaco.Position, line: string, itemData: ItemDataTemplate) {
   let perkSuggestions: { label: string; name: number | string }[] = []
   let startColumnRegex: RegExp

   // get all perk name > type and hash
   if (/import .+? from /.test(line)) {
      // i don't need to run this on every input
      startColumnRegex = /import .+? from /
      perkSuggestions = Object.values(itemData.description.modified).reduce((acc, perk) => {
         if (!perk.name) return acc
         const perkName = `${perk.name}${' '.repeat(Math.max(20 - perk.name.length, 0))}`
         const label = `${perkName} > ${perk.type} > ${perk.id}`
         acc.push({
            label,
            name: perk.id
         })
         return acc
      }, perkSuggestions)
   }

   const suggestions = perkSuggestions.map(({ label, name }) => ({
      label,
      insertText: `${name}`,
      kind: monaco.languages.CompletionItemKind.Snippet,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.KeepWhitespace,
      range: {
         startLineNumber: position.lineNumber | 1,
         endLineNumber: position.lineNumber,
         startColumn: line.match(startColumnRegex)![0].length + 1,
         endColumn: position.column
      }
   }))
   return suggestions
}
