import * as monaco from 'monaco-editor'

export function createEditor() {
   monaco.languages.register({ id: 'clarityLangue' })

   monaco.languages.setMonarchTokensProvider('clarityLangue', {
      tokenizer: {
         root: [
            [/#highlight_[1-3]/, 'highlight'],
            [/< table >/, 'keyword'],
            [/<link http.+\s[\w]+ *?>/, 'link'],
            [/\|b|\|/, 'tableSeparator'],
            [/<\$>/, 'end'],
            [/<formula .*>/, 'formula'],
         ]
      }
   })

   monaco.editor.defineTheme('myCoolTheme', {
      base: 'vs',
      inherit: false,
      rules: [
         // { foreground: 'ffffff' }, // default text color

         { token: 'highlight', foreground: 'b6ff40' },
         // { token: 'highlightedText', foreground: 'b6ff40' },
         { token: 'keyword', foreground: '00dcff' },
         { token: 'link', foreground: 'bbaeff' },
         { token: 'tableSeparator', foreground: '00dcff' },
         { token: 'end', foreground: 'ff8282' },
         { token: 'formula', foreground: 'dcdcaa' },
      ],
      colors: {
         'editor.foreground': '#ffffff',
         'editorLineNumber.foreground': '#fff123', // line number
         'editorLineNumber.activeForeground': '#ffffff', // active line number
         'editorCursor.foreground': '#ffffff', // cursor
         'editor.background': '#333333', // editor background
         'editor.lineHighlightBorder': '#fff0',
         'editor.selectionBackground': '#709e00', // selection Background // todo: color needs some work

         'diffEditor.removedTextBackground': '#ff000070',
         'diffEditor.insertedTextBackground': '#a0bf5652',

         'editorSuggestWidget.background': '#333333', // dropdown background
         'list.hoverBackground': '#0060c066', // dropdown hover over
      }
   })

   monaco.languages.registerCompletionItemProvider('clarityLangue', {
      provideCompletionItems: () => {
         const suggestions = [
            {
               label: 'highlight',
               kind: monaco.languages.CompletionItemKind.Keyword,
               insertText: '#highlight_${1:1} ${2: } <$>',
               insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
               label: 'table',
               kind: monaco.languages.CompletionItemKind.Snippet,
               insertText: ['< table > ', '\t$0', '<$>'].join('\n'),
               insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
               // documentation: 'If-Else Statement'
            },
            {
               label: 'link',
               kind: monaco.languages.CompletionItemKind.Snippet,
               insertText: '<link ${1: } ${2: }>',
               insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
               documentation: 'If-Else Statement'
            },
            {
               label: 'combatant',
               kind: monaco.languages.CompletionItemKind.Snippet,
               insertText: '<link https://d2clarity.page.link/combatant ${1:Combatant}>',
               insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            // {
            //    label: 'recoil',
            //    kind: monaco.languages.CompletionItemKind.Text,
            //    insertText: 'https://d2clarity.page.link/RecoilDirection'
            // }
            {
               label: 'formula_ready',
               kind: monaco.languages.CompletionItemKind.Snippet,
               insertText: '<formula ${2:Ready Speed:} ready_${1: }>',
               insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
               label: 'formula_stow',
               kind: monaco.languages.CompletionItemKind.Snippet,
               insertText: '<formula ${2:Stow Speed:} stow_${1: }>',
               insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
               label: 'formula_range',
               kind: monaco.languages.CompletionItemKind.Snippet,
               insertText: '<formula ${2:In_Game Range:} range_${1: }>',
               insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
            {
               label: 'formula_reload',
               kind: monaco.languages.CompletionItemKind.Snippet,
               insertText: '<formula ${2:Reload Time:} reload_${1: }>',
               insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
            },
         ]
         return { suggestions: suggestions }
      }
   })
   const monacoSettings = {
      theme: 'myCoolTheme',
      // value: getCode(),
      language: 'clarityLangue',
      minimap: {
         enabled: false
      },
      // lineNumbers: 'on',
      lineNumbersMinChars: 2,
      automaticLayout: true,
      wordWrap: 'on' as const
   }
   const editorContainer = document.getElementById('editor') as HTMLDivElement
   const this_editor = monaco.editor.create(editorContainer, monacoSettings)

   const editorContainer2 = document.getElementById('editor2') as HTMLDivElement
   const this_editor2 = monaco.editor.create(editorContainer2, monacoSettings)

   var originalModel = monaco.editor.createModel('just some text\n\nHello World\n\nSome more text', 'clarityLangue')
   var modifiedModel = monaco.editor.createModel('just some Text\n\nHello World\n\nSome more changes', 'clarityLangue')

   // var diffEditor = monaco.editor.createDiffEditor(editorContainer);
   // diffEditor.setModel({
   //    modified: modifiedModel,
   //    original: originalModel
   // });
   return this_editor
}