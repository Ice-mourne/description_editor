import { ItemDataTemplate } from '@components/provider/dataProvider'
import { Updater } from 'use-immer'

export function descriptionImport(description: string, perkHash: number, itemData: ItemDataTemplate) {
   const lines = description.split('\n')
   const newDescription = lines.map((line) => {
      if (!/^import [A-z0-9 ]+? from (\d+?|self)/.test(line)) return line

      const importName = line.match(/(?<=import) .+ (?=from)/)?.[0].trim()
      const importFrom = line.match(/(?<=from) +?(\d+|self)/)?.[0].trim()
      if (!importName || !importFrom) return line

      if (/main/gi.test(importName)) {
         if (/self/gi.test(importFrom)) {
            return itemData.description.modified?.[perkHash]?.editor?.mainEditor
         }
         return itemData.description.modified?.[importFrom]?.editor?.mainEditor
      }
      if (/secondary/gi.test(importName)) {
         if (/self/gi.test(importFrom)) {
            return itemData.description.modified?.[perkHash]?.editor?.secondaryEditor
         }
         return itemData.description.modified?.[importFrom]?.editor?.secondaryEditor
      }
      return itemData.saved.perks?.[Number(importFrom)]?.[importName] || ''
   })

   return newDescription.join('\n')
}

export function descriptionExport(description: string, perkHash : number, setItemData: Updater<ItemDataTemplate>) {
   const exports = description.match(/^export [A-z0-9 ]+ \([\s\S]*?\n\) *?$/gm)

   setItemData((draft) => {
      delete draft.saved.perks[perkHash]
   })

   let hiddenExportIndexes: number[] = []

   const completeExports = exports?.reduce((acc, export_, index) => {
      const lines = export_.split('\n')
      const exportName = lines[0].replace(/export|\(.*/gi, '').trim()
      lines.splice(0, 1)
      lines.splice(-1, 1)

      acc[exportName.replace('hidden', '').trim()] = lines.join('\n')

      if (/hidden/.test(exportName)) hiddenExportIndexes.push(index)

      return acc
   }, {} as { [key: string]: string })

   if (!completeExports) return

   setItemData((draft) => {
      draft.saved.perks[perkHash] = draft.saved.perks[perkHash] || {}
      draft.saved.perks[perkHash] = completeExports
   })

   hiddenExportIndexes.forEach((exportIndex) => {
      if (exports) {
         description = description.replace(exports[exportIndex], '')
      }
   })

   description = description.replace(/(\n^export [A-z0-9 ]+ \(|export [A-z0-9 ]+ \( *?\n)/gm, '')
   description = description.replace(/(\n^\)$|^\)$\n)/gm, '')

   return description
}
