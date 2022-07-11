import { ItemDataTemplate, itemData_context, setItemData_context } from '@components/provider/dataProvider'
import * as monaco from 'monaco-editor'
import { useContext, useEffect, useState } from 'react'
import diffEditorChange from './diffEditorChange'
import { editorHotkeys } from './editorHotkeys'
import { setDataToMainEditor, setDataToSecondaryEditor } from './setData'
import setNewDescription from './setNewDescription'

export interface Editors {
   normal: {
      main: monaco.editor.IStandaloneCodeEditor
      secondary: monaco.editor.IStandaloneCodeEditor
   }
   diff: {
      main: monaco.editor.IStandaloneDiffEditor
      secondary: monaco.editor.IStandaloneDiffEditor
   }
}

export default function Editor({ onMount }: { onMount: (itemData: ItemDataTemplate) => Editors | null}) {
   const setItemData = useContext(setItemData_context)
   const itemData = useContext(itemData_context)

   const [editor, setEditor] = useState<Editors | null>(null)
   const [active, setActive] = useState(false)

   useEffect(() => {
      const newEditor = onMount(itemData)
      if (newEditor !== null) {
         setEditor(newEditor)
         editorHotkeys(newEditor.normal.main)
      }
      if (editor) setActive(true)
   }, [active])

   useEffect(() => {
      if (editor === null) return
      setNewDescription(editor, itemData)
   }, [itemData.selectedPerkHash])

   useEffect(() => {
      if (editor === null) return
      const mainEditorEvent: monaco.IDisposable | undefined = editor.normal.main
         .getModel()
         ?.onDidChangeContent(() => setDataToMainEditor(editor, mainEditorEvent, setItemData))

      const secondaryEditorEvent: monaco.IDisposable | undefined = editor.normal.secondary
         .getModel()
         ?.onDidChangeContent(() => setDataToSecondaryEditor(editor, secondaryEditorEvent, setItemData))

      diffEditorChange(editor)
   }, [itemData])

   return (
      <div className="editor-container">
         <div id="editor-1"></div>
         <div id="editor-2"></div>
         <div id="diffEditor-1" className="hidden"></div>
         <div id="diffEditor-2" className="hidden"></div>
      </div>
   )
}
