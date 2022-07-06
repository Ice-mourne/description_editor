import { Description, ItemDataTemplate } from '@components/provider/dataProvider'
import convertDescription from '@ts/convertDescription'
import { current } from 'immer'
import { WritableDraft } from 'immer/dist/internal'
import * as monaco from 'monaco-editor'
import { Updater } from 'use-immer'
import { Editors } from './Editor'

export function setDataToMainEditor(
   editor: Editors,
   event: monaco.IDisposable | undefined,
   setItemData: Updater<ItemDataTemplate>
) {
   const editorValue = editor.normal.main.getValue()
   const diffEditorValue = editor.diff.main.getModifiedEditor().getValue()

   setItemData((draft) => {
      const itemData = current(draft)
      const perkHash = itemData.selectedPerkHash || 0
      const convertedDescription = convertDescription(editorValue, itemData, setItemData, 'main')

      // add converted description
      draft.description.modified[perkHash].description = convertedDescription as WritableDraft<Description>[]
      // add raw description
      draft.description.modified[perkHash].editor!.mainEditor = editorValue
   })

   // if main editor value is not same as diff editor set value to diff
   if (editorValue !== diffEditorValue) {
      editor.diff.main.getModifiedEditor().setValue(editorValue)
   }
   event?.dispose()
}

export function setDataToSecondaryEditor(
   editor: Editors,
   event: monaco.IDisposable | undefined,
   setItemData: Updater<ItemDataTemplate>
) {
   const editorValue = editor.normal.secondary.getValue()
   const diffEditorValue = editor.diff.secondary.getModifiedEditor().getValue()

   setItemData((draft) => {
      const itemData = current(draft)
      const perkHash = itemData.selectedPerkHash || 0
      const convertedDescription = convertDescription(editorValue, itemData, setItemData, 'secondary')

      // add converted description
      draft.description.modified[perkHash].simpleDescription = convertedDescription as WritableDraft<Description>[]
      // add raw description
      draft.description.modified[perkHash].editor!.secondaryEditor = editorValue
   })

   // if main editor value is not same as diff editor set value to diff
   if (editorValue !== diffEditorValue) {
      editor.diff.secondary.getModifiedEditor().setValue(editorValue)
   }
   event?.dispose()
}
