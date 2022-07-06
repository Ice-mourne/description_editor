import { Editors } from './Editor'

export default function diffEditorChange(editor: Editors) {
   // on change in diff main editor set value to normal main editor
   editor.diff.main
      .getModifiedEditor()
      .getModel()
      ?.onDidChangeContent(() => {
         const editorValue = editor.normal.main.getValue()
         const diffEditorValue = editor.diff.main.getModifiedEditor().getValue()
         if (editorValue !== diffEditorValue) {
            editor.normal.main.setValue(diffEditorValue)
         }
      })
   // on change in diff secondary editor set value to secondary main editor
   editor.diff.secondary
      .getModifiedEditor()
      .getModel()
      ?.onDidChangeContent(() => {
         const editorValue = editor.normal.secondary.getValue()
         const diffEditorValue = editor.diff.secondary.getModifiedEditor().getValue()
         if (editorValue !== diffEditorValue) {
            editor.normal.secondary.setValue(diffEditorValue)
         }
      })
}
