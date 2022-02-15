import * as monaco from 'monaco-editor'

import { itemData_context, setItemData_context } from '@components/provider/dataProvider'
import { useContext, useEffect, useState } from 'react'

import convertDescription from '@ts/convertDescription'

interface Editors {
   normal: {
      main: monaco.editor.IStandaloneCodeEditor
      secondary: monaco.editor.IStandaloneCodeEditor
   }
   diff: {
      main: monaco.editor.IStandaloneDiffEditor
      secondary: monaco.editor.IStandaloneDiffEditor
   }
}

export default function Editor({ onMount }: { onMount: () => Editors }) {
   const setItemData = useContext(setItemData_context)
   const itemData = useContext(itemData_context)

   const [editor, setEditor] = useState<Editors | null>(null)
   const [activated, setActivated] = useState(false)

   useEffect(() => {
      if (!editor) {
         setEditor(onMount())
         setActivated(true)
         return
      }
      const setData = (editorType: string) => {
         const editorValue = {
            normal: {
               main: editor.normal.main.getValue(),
               secondary: editor.normal.secondary.getValue()
            },
            diff: {
               main: editor.diff.main.getModifiedEditor().getValue(),
               secondary: editor.diff.secondary.getModifiedEditor().getValue()
            }
         }
         setItemData((itemData) => ({
            ...itemData,
            dataFromEditor: {
               converted: {
                  mainEditor: convertDescription(editorValue.normal.main),
                  secondaryEditor: convertDescription(editorValue.normal.secondary)
               },
               original: {
                  mainEditor: editorValue.normal.main,
                  secondaryEditor: editorValue.normal.secondary
               }
            }
         }))

         if (editorType === 'normal') {
            if (editorValue.normal.main != editorValue.diff.main) {
               editor.diff.main.getModifiedEditor().setValue(editorValue.normal.main)
            }
            if (editorValue.normal.secondary != editorValue.diff.secondary) {
               editor.diff.secondary.getModifiedEditor().setValue(editorValue.normal.secondary)
            }
         }
         if (editorType === 'diff') {
            if (editorValue.normal.main != editorValue.diff.main) {
               editor.normal.main.setValue(editorValue.diff.main)
            }
            if (editorValue.normal.secondary != editorValue.diff.secondary) {
               editor.normal.secondary.setValue(editorValue.diff.secondary)
            }
         }
      }
      // copy data to normal editor and back to diff editor as necessary
      editor.normal.main.getModel()?.onDidChangeContent(() => setData('normal'))
      editor.normal.secondary.getModel()?.onDidChangeContent(() => setData('normal'))
      editor.diff.main
         .getModifiedEditor()
         .getModel()
         ?.onDidChangeContent(() => setData('diff'))
      editor.diff.secondary
         .getModifiedEditor()
         .getModel()
         ?.onDidChangeContent(() => setData('diff'))


   }, [activated])

   useEffect(() => {
      if (!editor) return
      const mainEditorDescription = itemData.perkData.descriptions.mainEditor
      const secondaryEditorDescription = itemData.perkData.descriptions.secondaryEditor

      if (!mainEditorDescription) return
      editor.normal.main.setValue(mainEditorDescription)
      editor.diff.main.getModifiedEditor().setValue(mainEditorDescription)
      editor.diff.main.getOriginalEditor().setValue(mainEditorDescription)

      if (!secondaryEditorDescription) return
      editor.normal.secondary.setValue(secondaryEditorDescription)
      editor.diff.secondary.getModifiedEditor().setValue(secondaryEditorDescription)
      editor.diff.secondary.getOriginalEditor().setValue(secondaryEditorDescription)

   }, [itemData.perkData.descriptions.mainEditor, itemData.perkData.descriptions.secondaryEditor])

   return (
      <div className="editor-container">
         <div id="editor-1"></div>
         <div id="editor-2"></div>
         <div id="diffEditor-1" className="hidden"></div>
         <div id="diffEditor-2" className="hidden"></div>
      </div>
   )
}
