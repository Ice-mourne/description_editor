import * as monaco from 'monaco-editor'

export function createEditor() {
   monaco.languages.register({ id: 'clarityLangue' })
   monaco.languages.setMonarchTokensProvider('clarityLangue', {
      tokenizer: {
         root: [
            // table stuff
            [/< table >/, 'table', '@table'],
            // self contained stuff
            [/<(stasis|arc|solar|void|primary|special|heavy|background|center)/, 'selfContained', '@selfContained'], // stasis|arc|solar|void|primary|special|heavy|background|center
            // highlight stuff
            [/<(highlight_[1-4]|pve|pvp|bold)/, 'highlight', '@highlight'],
            // extra stuff
            [/<(formula|link)/, 'extra', '@extra'],
            [/<title /, 'title', '@title']
         ],
         table: [
            [/<\$>/, 'tableEnd', '@pop'],
            [/\|b|\|/, 'tableSeparator'],
            [/<(stasis|arc|void|solar|background|center)/, 'selfContained', '@selfContained'],
            [/<(highlight_[1-4]|bold|primary|special|heavy|pve|pvp)/, 'highlight', '@highlight'],
            [/<(formula|link)/, 'extra', '@extra']
         ],
         selfContained: [
            [/\/>/, 'selfContained', '@pop'],
            [/./, 'selfContained.text'],
         ],
         highlight: [
            [/\/>/, 'highlight', '@pop'],
            [/./, 'highlight.text']
         ],
         extra: [
            [/\/>/, 'extra', '@pop'],
            [/(ready|stow|range|reload)_\d+/, 'extra.content'],
            [/https:.+? /, 'extra.content'],
            [/./, 'extra.text']
         ],
         title: [
            [/\/>/, 'title', '@pop'],
            [/\[.*\]/, 'title.text']
         ]

      }
   })
   monaco.editor.defineTheme('myCoolTheme', {
      base: 'vs',
      inherit: false,
      rules: [
         // table stuff
         { token: 'table', foreground: '4fc1ff' }, // const blue
         { token: 'tableSeparator', foreground: '4fc1ff' }, // const blue
         { token: 'tableEnd', foreground: '4fc1ff' }, // const blue
         // self contained stuff
         { token: 'selfContained', foreground: '9cdcfe' }, // let blue
         { token: 'selfContained.text', foreground: 'd16969' }, // regex red
         // highlight stuff
         { token: 'highlight', foreground: '4fc1ff' }, // const blue
         { token: 'highlight.text', foreground: 'ffffff' }, // white
         // formula stuff
         { token: 'extra', foreground: '4ec9b0' }, // class green
         { token: 'extra.text', foreground: 'ffffff' }, // white
         { token: 'extra.content', foreground: '4fc1ff' }, // const blue
         // exceptions
         { token: 'bold.selfContained', foreground: '9cdcfe' }, // let blue
         { token: 'bold', foreground: '4fc1ff' }, // const blue
         { token: 'bold.text', foreground: 'ffffff' }, // const blue
         // title stuff
         { token: 'title', foreground: '4ec9b0' }, // class green
         { token: 'title.text', foreground: '4fc1ff' }, // const blue

      ],
      colors: {
         'editor.foreground': '#ffffff', // normal text | white
         'editor.background': '#1e1e1e', // editor background | dark grey
         'editorLineNumber.foreground': '#858585', // line number | grey
         'editorLineNumber.activeForeground': '#c6c6c6', // active line number | light grey
         'editorCursor.foreground': '#ffffff', // blinking thing | white
         'editor.lineHighlightBorder': '#fff0', // active line border | transparent
         'editor.selectionBackground': '#004972b8', // selected text background | blue // todo: color needs some work
         'editorSuggestWidget.background': '#252526', // suggestion background
         'editorSuggestWidget.border': '#454545', // suggestion border
         'list.hoverBackground': '#2a2d2e', // dropdown hover over
         // split view
         'diffEditor.removedTextBackground': '#ff000070', // removed text background
         'diffEditor.insertedTextBackground': '#a0bf5652' // inserted text background
      }
   })

   monaco.languages.registerCompletionItemProvider('clarityLangue', {
      provideCompletionItems: () => {
         const keywordsSettings = {
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
         }
         const suggestions = [
            //--- table stuff
            {
               label: 'table',
               insertText: ['< table > ', '$0', '<$>'].join('\n'),
               ...keywordsSettings
            },
            //--- self contained
            {
               label: 'background',
               kind: monaco.languages.CompletionItemKind.Text,
               insertText: '<background/>'
            },
            {
               label: 'center',
               kind: monaco.languages.CompletionItemKind.Text,
               insertText: '<center/>'
            },
            {
               label: 'bold line',
               kind: monaco.languages.CompletionItemKind.Text,
               insertText: '<bold/>',
            },
            {
               label: 'stasis',
               kind: monaco.languages.CompletionItemKind.Text,
               insertText: '<stasis/>'
            },
            {
               label: 'arc',
               kind: monaco.languages.CompletionItemKind.Text,
               insertText: '<arc/>'
            },
            {
               label: 'void',
               kind: monaco.languages.CompletionItemKind.Text,
               insertText: '<void/>'
            },
            {
               label: 'solar',
               kind: monaco.languages.CompletionItemKind.Text,
               insertText: '<solar/>'
            },
            {
               label: 'primary',
               kind: monaco.languages.CompletionItemKind.Text,
               insertText: '<primary/>'
            },
            {
               label: 'special',
               kind: monaco.languages.CompletionItemKind.Text,
               insertText: '<special/>'
            },
            {
               label: 'heavy',
               kind: monaco.languages.CompletionItemKind.Text,
               insertText: '<heavy/>'
            },

            //--- highlight stuff
            {
               label: 'highlight',
               insertText: '<highlight_${1:1} ${2: } />',
               ...keywordsSettings
            },
            {
               label: 'bold text',
               insertText: '<bold ${1: } />',
               ...keywordsSettings
            },
            {
               label: 'pve',
               insertText: '<pve ${1: } />',
               ...keywordsSettings
            },
            {
               label: 'pvp',
               insertText: '<pvp ${1: } />',
               ...keywordsSettings
            },
            //--- extra stuff
            {
               label: 'link',
               insertText: '<link ${1: } ${2: }>',
               ...keywordsSettings
            },
            {
               label: 'combatant',
               insertText: '<link https://d2clarity.page.link/combatant ${1:Combatant}/>',
               ...keywordsSettings
            },
            {
               label: 'formula_ready',
               insertText: '<formula ${2:Ready Speed:} ready_${1:0} />',
               ...keywordsSettings
            },
            {
               label: 'formula_stow',
               insertText: '<formula ${2:Stow Speed:} stow_${1:0} />',
               ...keywordsSettings
            },
            {
               label: 'formula_range',
               insertText: '<formula ${2:In_Game Range:} range_${1:0} />',
               ...keywordsSettings
            },
            {
               label: 'formula_reload',
               insertText: '<formula ${2:Reload Time:} reload_${1:0} />',
               ...keywordsSettings
            },
            //--- unnamed formula stuff
            {
               label: 'formula_ready_empty',
               insertText: '<formula ready_${1:0} />',
               ...keywordsSettings
            },
            {
               label: 'formula_stow_empty',
               insertText: '<formula stow_${1:0} />',
               ...keywordsSettings
            },
            {
               label: 'formula_range_empty',
               insertText: '<formula range_${1:0} />',
               ...keywordsSettings
            },
            {
               label: 'formula_reload_empty',
               insertText: '<formula reload_${1:0} />',
               ...keywordsSettings
            },
            //--- title stuff
            {
               label: 'title',
               insertText: '<title ${1: } [${1: }] />',
               ...keywordsSettings
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
