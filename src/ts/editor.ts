import { ItemDataTemplate } from '@components/provider/dataProvider'
import { selfContainedKeywords } from '@data/ramdomData'
import { editor, languages } from 'monaco-editor'
import { imports, selfContained, tableSettings } from './autoCompletion'

export interface ConditionalSuggestions {
   range: {
      startLineNumber: number
      endLineNumber: number
      startColumn: number
      endColumn: number
   }
   kind: languages.CompletionItemKind
   insertTextRules: languages.CompletionItemInsertTextRule
   label: string
   insertText: string
}

export function createEditor(itemData: ItemDataTemplate) {
   const containers = {
      normal: {
         main: document.querySelector('#editor-1') as HTMLDivElement,
         secondary: document.querySelector('#editor-2') as HTMLDivElement
      },
      diff: {
         main: document.querySelector('#diffEditor-1') as HTMLDivElement,
         secondary: document.querySelector('#diffEditor-2') as HTMLDivElement
      }
   }
   // if container not ready return
   if (containers.normal.main === null) return null

   // if editor was created don't make new one
   if (containers.normal.main.firstElementChild?.classList.contains('monaco-editor')) {
      return null
   }

   languages.register({ id: 'clarityLangue' })
   languages.setMonarchTokensProvider('clarityLangue', {
      selfContained: selfContainedKeywords.map((w) => `<${w}/>`).join('|'),

      weapons: [
         'auto rifle',
         'scout rifle',
         'pulse rifle',
         'sniper rifle',
         'trace rifle',
         'fusion rifle',
         'linear fusion rifle',
         'rocket launcher',
         'grenade launcher',
         'heavy grenade launcher',
         'submachine gun',
         'machine gun',
         'hand cannon',
         'shotgun',
         'sidearm',
         'bow',
         'sword',
         'glaive'
      ]
         .map((w) => ` ${w}(, )?`)
         .join('|'),

      highlightRegex: /<(green|blue|purple|yellow|bold|pve|pvp)/,

      // prettier-ignore
      tokenizer: {
         root: [
            [/^import [A-z0-9 ]+? from (\d+?|self|none)/, { token: '@rematch', next: '@import' }], //--- done
            [/^(export|title) [A-z0-9 ]+? \(/,            { token: '@rematch', next: '@export' }],

            [/< table( wide| center| formula){0,3}? >/,   { token: 'blue', next: '@table' }], // table start

            [/< +?weapon type +?\(@weapons{0,20}?\) +?>/, { token: 'blue' }],
            [/<\$\$>/,                                    { token: 'blue' }],

            [/@selfContained/,  { token: 'green' }],
            [/@highlightRegex/, { token: 'blue', next: '@highlight'}],

            [/<(formula |link |title )/, { token: 'green', next: '@extra' }],
            [/\${.*?/,                   { token: 'yellow', next: '@math' }],
         ],

         import: [ //--- done
            [/(^import | from )/,    { token: 'purple'    }],
            [/[A-z0-9 ]+?(?= from)/, { token: 'lightBlue' }],
            [/([0-9]+|self|none)/,   { token: 'lightBlue', next: '@pop' }],
         ],
         export: [
            [/^(export|title) /,   { token: 'purple'    }], // word export/title
            [/[A-z0-9 ]+?(?= \()/, { token: 'lightBlue' }], // exports name
            [/\( *?$/,             { token: 'purple'    }], // (

            [/< table( wide| center| formula){0,3}? >/, { token: 'blue', next: '@table' }], // table start

            [/< +?weapon type +?\(@weapons{0,20}?\) +?>/, { token: 'blue' }],
            [/<\$\$>/,                                    { token: 'blue' }],

            [/@selfContained/,  { token: 'green' }],
            [/@highlightRegex/, { token: 'blue', next: '@highlight'}],

            [/<(formula |link |title )/, { token: 'green',  next: '@extra' }],
            [/\${.*?/,                   { token: 'yellow', next: '@math' }],

            [/^\)/, { token: 'purple', next: '@pop' }], // end of export
         ],

         table: [
            [/<\$>/,          { token: 'blue', next: '@pop' }], // table end
            [/\|[bchr\d-]{0,5}/, { token: 'blue' }], // table only content

            [/@selfContained/,           { token: 'green' }],
            [/@highlightRegex/,          { token: 'blue',   next: '@highlight' }],
            [/<(formula |link |title )/, { token: 'green',  next: '@extra' }],
            [/\${.*?/,                   { token: 'yellow', next: '@math' }]
         ],

         highlight: [
            [/\/>/,    { token: 'blue',   next: '@pop' }],
            [/\${.*?/, { token: 'yellow', next: '@math' }]
         ],
         extra: [
            [/ \/>/,    { token: 'green',  next: '@pop' }],
            [/\[.+?\]/, { token: 'blue' }],
            [/\${.*?/,  { token: 'yellow', next: '@math' }]
         ],
         math: [
            [/}/, { token: 'yellow', next: '@pop' }],
         ]
      }
   })
   editor.defineTheme('myCoolTheme', {
      base: 'vs',
      inherit: false,
      // prettier-ignore
      rules: [
         { token: 'green',     foreground: '4ec9b0' }, // class green
         { token: 'blue',      foreground: '4fc1ff' }, // const blue
         { token: 'purple',    foreground: 'c586c0' }, // export purple
         { token: 'lightBlue', foreground: '9cdcfe' }, // let blue
         { token: 'yellow',    foreground: 'dcdcaa' }, // function yellow
         { token: 'test',      foreground: 'dcdcaa' }  // function yellow
      ],
      // prettier-ignore
      colors: {
         'editor.foreground':                 '#ffffff',   // normal text | white
         'editor.background':                 '#1e1e1e',   // editor background | dark grey
         'editorLineNumber.foreground':       '#858585',   // line number | grey
         'editorLineNumber.activeForeground': '#c6c6c6',   // active line number | light grey
         'editorCursor.foreground':           '#ffffff',   // blinking thing | white
         'editor.lineHighlightBorder':        '#fff0',     // active line border | transparent
         'editor.selectionBackground':        '#004972b8', // selected text background | blue // todo: color needs some work
         'editorSuggestWidget.background':    '#252526',   // suggestion background
         'editorSuggestWidget.border':        '#454545',   // suggestion border
         'list.hoverBackground':              '#2a2d2e',   // dropdown hover over
         'foreground':                        '#78a8f6',   // image color in dropdown
         // split view
         'diffEditor.removedTextBackground':  '#ff000070', // removed text background
         'diffEditor.insertedTextBackground': '#a0bf5652'  // inserted text background
      }
   })

   languages.registerCompletionItemProvider('clarityLangue', {
      provideCompletionItems: (model, position, context, provider) => {
         const lineContent = model.getLineContent(position.lineNumber)

         let conditionalSuggestions: ConditionalSuggestions[] = []

         if (/< table /.test(lineContent)) conditionalSuggestions = tableSettings(position, lineContent)
         if (/^import .+? from.*?/.test(lineContent)) conditionalSuggestions = imports(position, lineContent, itemData)

         const suggestions = [
            {
               label: 'title',
               insertText: '<title ${1: } [${2:name}] />',
               documentation: `Title witch will show up in description`,
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'titles contents',
               insertText: ['title ${1:name} (', '$0', ')'].join('\n'),
               documentation: `Content of title. Content can only be used on this perk`,
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'table',
               insertText: ['< table >', '$0', '<$>'].join('\n'),
               documentation: `< table > optionally can have center, formula, wide ex < table wide formula >\n |\tnormal text\n |b\tbold text\n |c\tcentered text\n |r\tmoves text to right side\n |h\tadd background\n\tall of them can be combined for example\n |bc\tmakes bold centered text\n<$>`,
               kind: languages.CompletionItemKind.Folder,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'import',
               insertText: 'import ${1:unique name} from $0',
               documentation: `Allows importing full description or part of description if it was exported\nimport main from self can be used to import whole description from main editor if used in secondary editor`,
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'import from top editor',
               insertText: 'import main from self',
               documentation: `Imports everything from top editor from same perk as current`,
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'import main',
               insertText: 'import main from $0',
               documentation: `Imports everything from main editor of selected perk`,
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'import stats',
               insertText: 'import stats from $0',
               documentation: `Allows importing stats from other descriptions\nimport stats from none can be used to clear stats`,
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'export',
               insertText: ['export ${1:unique name} (', '$0', ')'].join('\n'),
               documentation: `Exports text inside allowing reusability of text in other descriptions\nText in other descriptions will always match exported text`,
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,

            {
               label: 'bold text',
               insertText: '<bold ${1: } />',
               documentation: `Makes text inside bold`,
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'pve',
               insertText: '<pve ${1: } />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'pvp',
               insertText: '<pvp ${1: } />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,

            {
               label: 'formula_ready',
               insertText: '<formula ${2:Ready Speed:} [ready_${1:0}] />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'formula_stow',
               insertText: '<formula ${2:Stow Speed:} [stow_${1:0}] />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'formula_range',
               insertText: '<formula ${2:Effective Range:} [range_${1:0}] />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'formula_reload',
               insertText: '<formula ${2:Reload Time:} [reload_${1:0}] />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,

            {
               label: 'formula_ready_empty',
               insertText: '<formula [ready_${1:0}] />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'formula_stow_empty',
               insertText: '<formula [stow_${1:0}] />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'formula_range_empty',
               insertText: '<formula [range_${1:0}] />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'formula_reload_empty',
               insertText: '<formula [reload_${1:0}] />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,

            {
               label: 'link',
               insertText: '<link ${1:Name} [${2:URL}] />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'combatant',
               insertText: '<link ${1:Combatant} [https://d2clarity.page.link/combatant] />',
               kind: languages.CompletionItemKind.Class,
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,

            {
               label: 'highlight green',
               insertText: '<green ${1: } />',
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'highlight yellow',
               insertText: '<yellow ${1: } />',
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'highlight blue',
               insertText: '<blue ${1: } />',
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,
            {
               label: 'highlight purple',
               insertText: '<purple ${1: } />',
               insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet
            } as unknown as ConditionalSuggestions,

            ...selfContained(selfContainedKeywords)
         ]
         return { suggestions: [...suggestions, ...conditionalSuggestions] }
      }
   })

   const defaultSettings = {
      theme: 'myCoolTheme',
      language: 'clarityLangue',
      minimap: {
         enabled: false
      },
      automaticLayout: true,
      wordWrap: 'on' as const,
      mouseWheelZoom: true
   }
   const normalSettings = {
      ...defaultSettings,
      lineNumbersMinChars: 2,
      lineDecorationsWidth: 0
   }
   const diffSettings = {
      ...defaultSettings,
      lineNumbersMinChars: 3,
      lineDecorationsWidth: 15,
      renderOverviewRuler: false,
      renderIndicators: false
   }

   const models = {
      main: {
         original: editor.createModel('', 'clarityLangue'),
         modified: editor.createModel('', 'clarityLangue')
      },
      secondary: {
         original: editor.createModel('', 'clarityLangue'),
         modified: editor.createModel('', 'clarityLangue')
      }
   }
   const editors = {
      normal: {
         main: editor.create(containers.normal.main, normalSettings),
         secondary: editor.create(containers.normal.secondary, normalSettings)
      },
      diff: {
         main: editor.createDiffEditor(containers.diff.main, diffSettings),
         secondary: editor.createDiffEditor(containers.diff.secondary, diffSettings)
      }
   }
   editors.diff.main.setModel({
      modified: models.main.modified,
      original: models.main.original
   })
   editors.diff.secondary.setModel({
      modified: models.secondary.modified,
      original: models.secondary.original
   })

   // toggle between editors
   document.querySelector<HTMLButtonElement>('#toggleEditor')?.addEventListener('click', () => {
      const normal = containers.normal
      const diff = containers.diff

      normal.main.classList.toggle('hidden')
      normal.secondary.classList.toggle('hidden')
      diff.main.classList.toggle('hidden')
      diff.secondary.classList.toggle('hidden')
   })

   return { ...editors }
}
// https://stackoverflow.com/questions/56828421/how-to-make-left-side-original-code-of-monaco-diff-editor-editable
// change witch editor is editable
