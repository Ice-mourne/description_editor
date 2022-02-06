import * as monaco from 'monaco-editor'

import { useEffect, useState } from 'react'

import convertDescription from '@ts/convertDescription'

interface Editors {
   mainEditor: monaco.editor.IStandaloneCodeEditor
   secondaryEditor: monaco.editor.IStandaloneCodeEditor
}

export default function Editor({
   onMount,
   itemData,
   setItemData
}: {
   onMount: () => Editors
   itemData: any
   setItemData: (data: any) => void
}) {
   const [editor, setEditor] = useState({} as Editors)
   const [activated, setActivated] = useState(true)
   useEffect(() => {
      // this will prevent the editor from being created multiple times
      if (!Object.keys(editor).length) {
         setEditor(onMount())
         return
      }
      // this will prevent multiple did change events from being fired
      if (activated) {
         setActivated(false)
         editor.mainEditor.getModel()?.onDidChangeContent(() => {
            setItemData({
               ...itemData,
               editor: {
                  mainEditor: convertDescription(editor.mainEditor.getValue()),
                  secondaryEditor: convertDescription(editor.secondaryEditor.getValue())
               }
            })
            // convertDescription(editor.mainEditor.getValue())
         })
         editor.secondaryEditor.getModel()?.onDidChangeContent(() => {
            setItemData({
               ...itemData,
               editor: {
                  mainEditor: convertDescription(editor.mainEditor.getValue()),
                  secondaryEditor: convertDescription(editor.secondaryEditor.getValue())
               }
            })
            // convertDescription(editor.mainEditor.getValue())
         })
      }
   })
   return (
      <div className="editor-container">
         <div id="editor"></div>
         <div id="editor2"></div>
      </div>
   )
}
