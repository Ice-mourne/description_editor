import { ItemDataTemplate } from '@components/provider/dataProvider'
import { Updater } from 'use-immer'

export function statImport(description: string, perkHash: number, setItemData: Updater<ItemDataTemplate>) {
   const lines = description.split('\n')
   const newDescription = lines.flatMap((line) => {
      if (!/^import stats from (\d+?|none)/.test(line)) return line

      const importFrom = line.match(/(?<=from) +?(\d+|none)/)?.[0].trim()
      if (!importFrom) return line

      setItemData((draft) => {
         const selectedPerkHash = draft.selectedPerkHash || 0
         const statsToImport = draft.description.modified[importFrom]?.stats
         if (!statsToImport || importFrom === 'none') {
            delete draft.description.modified[perkHash].stats
         } else {
            draft.description.modified[perkHash].stats = statsToImport
         }
      })

      return []
   })
   return newDescription.join('\n')
}
