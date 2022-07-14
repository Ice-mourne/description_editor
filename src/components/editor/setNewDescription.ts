import { ItemDataTemplate } from '@components/provider/dataProvider'
import { Editors } from './Editor'

export default function setNewDescription(editor: Editors, itemData: ItemDataTemplate) {
   const id = itemData.selectedPerkHash
   const selectedPerk = itemData.description.modified?.[id]
   const selectedPerkIce = itemData.description.descriptionsIce?.[id]

   const description = selectedPerk?.editor?.mainEditor || ''
   const simpleDescription = selectedPerk?.editor?.secondaryEditor || ''

   const descriptionIce = selectedPerkIce?.editor?.mainEditor || ''
   const simpleDescriptionIce = selectedPerkIce?.editor?.secondaryEditor || ''

   editor.normal.main.setValue(description)
   editor.diff.main.getModifiedEditor().setValue(description)
   editor.diff.main.getOriginalEditor().setValue(descriptionIce)

   editor.normal.secondary.setValue(simpleDescription)
   editor.diff.secondary.getModifiedEditor().setValue(simpleDescription)
   editor.diff.secondary.getOriginalEditor().setValue(simpleDescriptionIce)
}
