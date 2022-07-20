import { DescriptionLine, ItemDataTemplate } from '@components/provider/dataProvider'
import { Updater } from 'use-immer'
import convertDescription from './convertDescription'

export function setTitle(
   description: string,
   perkHash: number,
   itemData: ItemDataTemplate,
   setItemData: Updater<ItemDataTemplate>,
   editorType: string
) {
   const exports = description.match(/^title [A-z0-9 ]+ \([\s\S]*?\n\) *?$/gm)

   setItemData((draft) => {
      // const selectedPerkHash = draft.selectedPerkHash || 0
      delete draft.description.modified[perkHash]?.titles
   })

   const completeExports = exports?.reduce((acc, export_) => {
      const lines = export_.split('\n')
      const exportName = lines[0].replace(/title|\(.*/gi, '').trim()
      lines.splice(0, 1)
      lines.splice(-1, 1)

      acc[exportName] = convertDescription(lines.join('\n'), perkHash, itemData, setItemData, editorType)

      return acc
   }, {} as { [key: string]: DescriptionLine[] })

   if (!completeExports) return

   setItemData((draft) => {
      const selectedPerkHash = draft.selectedPerkHash || 0
      draft.description.modified[selectedPerkHash].titles = draft.description.modified[selectedPerkHash]?.titles || {}
      draft.description.modified[selectedPerkHash].titles = completeExports
   })

   description = description.replace(/(\n)?^title [A-z0-9 ]+ \([\s\S]*?\n\)(\n)?/gm, '')

   return description
}
