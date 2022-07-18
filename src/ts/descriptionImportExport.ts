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
      // const selectedPerkHash = draft.selectedPerkHash || 0
      delete draft.saved.perks[perkHash]
   })

   const completeExports = exports?.reduce((acc, export_) => {
      const lines = export_.split('\n')
      const exportName = lines[0].replace(/export|\(.*/gi, '').trim()
      lines.splice(0, 1)
      lines.splice(-1, 1)

      acc[exportName] = lines.join('\n')

      return acc
   }, {} as { [key: string]: string })

   if (!completeExports) return

   setItemData((draft) => {
      const selectedPerkHash = draft.selectedPerkHash || 0
      draft.saved.perks[selectedPerkHash] = draft.saved.perks[selectedPerkHash] || {}
      draft.saved.perks[selectedPerkHash] = completeExports
   })

   description = description.replace(/(\n^export [A-z0-9 ]+ \(|export [A-z0-9 ]+ \( *?\n)/gm, '')
   description = description.replace(/(\n^\)$|^\)$\n)/gm, '')

   return description
}
