import { ItemDataTemplate } from '@components/provider/dataProvider'
import { Updater } from 'use-immer'

export function saveVariables(description: string, setItemData: Updater<ItemDataTemplate>) {
   setItemData((draft) => {
      const selectedPerkHash = draft.selectedPerkHash || 0
      delete draft.saved.variables[selectedPerkHash]
   })

   const varRegex = /^ *?var +?[A-z0-9]+ +?= +?.+$/gm
   if (!varRegex.test(description)) return description

   const varLines = description.match(varRegex)
   if (!varLines) return description

   varLines.forEach((line) => {
      const varName = line.match(/(?<=var )[A-z0-9]+(?= = )/)?.[0].trim()
      const varValue = line.match(/(?<=var [A-z0-9]+ +?= +?).*/)?.[0].trim()

      if (!varName || !varValue) return
      setItemData((draft) => {
         const selectedPerkHash = draft.selectedPerkHash || 0
         draft.saved.variables[selectedPerkHash] = draft.saved.variables[selectedPerkHash] || {}
         draft.saved.variables[selectedPerkHash][varName] = varValue
      })
   })

   return description.replace(/^ *?var +?[A-z0-9]+ +?= +?.+$\s/gm, '').replace(varRegex, '')
}

export function loadVariables(description: string, itemData: ItemDataTemplate) {
   const varRegex = /#[A-z0-9]+/g
   if (!varRegex.test(description)) return description

   const variables = description.match(varRegex)
   if (!variables) return description

   variables.forEach((variable) => {
      const varName = variable.replace('#', '').trim()
      const selectedPerkHash = itemData.selectedPerkHash || 0
      if (itemData.saved.variables?.[selectedPerkHash]?.[varName]) {
         const variableValue = itemData.saved.variables?.[Number(selectedPerkHash)]?.[varName] || ''
         description = description.replace(variable, variableValue)
      }
   })
   return description
}
