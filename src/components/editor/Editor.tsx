import * as monaco from 'monaco-editor'

import { useEffect, useState } from 'react'

import convertDescription from '@ts/convertDescription'

export default function Editor({
   onMount,
   itemData,
   setItemData
}: {
   onMount: () => monaco.editor.IStandaloneCodeEditor
   itemData: any
   setItemData: (data: any) => void
}) {
   const [editor, setEditor] = useState({} as monaco.editor.IStandaloneCodeEditor)
   const [activated, setActivated] = useState(true)
   useEffect(() => {
      if (!Object.keys(editor).length) {
         // this will prevent the editor from being created multiple times
         setEditor(onMount())
         return
      }
      if (activated) {
         // this will prevent multiple did change events from being fired
         setActivated(false)
         editor.getModel()?.onDidChangeContent(() => {
            setItemData({ ...itemData, description: convertDescription(editor.getValue()) })
            convertDescription(editor.getValue())
         })
      }
      // editor.setValue(itemData.description)
   })
   return (
      <div className="editor-container">
         <div id="editor"></div>
         <div id="editor2"></div>
      </div>
   )
}
