import { getDescriptionClovis, getDescriptionIce } from '@utils/fetchDescriptions'
import { createContext } from 'react'
import { Updater, useImmer } from 'use-immer'

export interface LinesContent {
   /** Text in this part of the line */
   text?: string
   /** Class names of this parts of the line */
   classNames?: (string | undefined)[]
   /** If this line has URL then this line and its text is part of link */
   link?: string
   /** If this line has formula then this line and its text is part of formula */
   formula?: string
   /** If this line has title then this line and its text is part of title */
   title?: string
}

export interface CellContent {
   /** Text in this part of the cell \<span> */
   text?: string
   /** this will be moved from hare when converting description */
   classNames?: (string | undefined)[]
   /** If this part of cell \<span> has URL then this part of the cell \<span> and its text is part of link */
   link?: string
   /** If this part of cell \<span> has formula then this part of the cell \<span> and its text is part of formula */
   formula?: string
   /** If this part of cell \<span> has title then this part of the cell \<span> and its text is part of title */
   title?: string // todo: it this a string?
   /** this will be moved from hare when converting description */
   colSpan?: number
   /** this will be moved from hare when converting description */
   rowSpan?: number
   /** this will be moved from hare when converting description */
   cellClassNames?: (string | undefined)[]
}

/** Contents of table row \<tr> aka array of cells */
export interface RowContent {
   /** Contents of cell \<td> aka array of spans \<span> */
   cellContent: CellContent[]
   /** Number of cell to span horizontally */
   colSpan?: number
   /** Number of cell to span vertically */
   rowSpan?: number
   /** this will be moved from hare when converting description */ //todo fix explanation
   classNames?: (string | undefined)[]
}

export interface TableLine {
   /** Contents of table row \<tr> aka array of cells */
   rowContent?: RowContent[]
   /** row \<tr> classNames */
   classNames?: (string | undefined)[]
}

export interface DescriptionLine {
   /** Lines \<div> class names */
   classNames?: (string | undefined)[]
   /** Contents of line \<span> */
   linesContent?: LinesContent[]
   /** Is table content only formulas */
   isFormula?: boolean | undefined
   /** Contents of table \<table> */
   table?: TableLine[]
}

export type SelectableType =
   | 'armorExotic'
   | 'armorMod'
   //---------
   | 'weaponPerkExotic'
   | 'weaponFrameExotic'
   | 'weaponPerk'
   | 'weaponPerkEnhanced'
   | 'weaponFrame'
   | 'weaponMod'
   | 'weaponCatalystExotic'
   //---------
   | 'ghostMod'
   | 'artifactMod'
   //---------
   | 'none'

export interface Item {
   id: number
   name: string

   itemId?: number
   itemName?: string

   type: SelectableType

   description: DescriptionLine[]
   simpleDescription?: DescriptionLine[]

   titles?: { [key: string]: DescriptionLine[] }

   stats?: { [key: string]: any }

   lastUpdate: number
   updatedBy: string
   investmentStatOnly?: boolean
}

export interface ItemWithEditor extends Item {
   editor?: {
      mainEditor: string
      secondaryEditor: string
   }
   inLiveDatabase?: boolean
   uploadToLive: boolean
   visible: boolean
}

export interface DescriptionWithEditor {
   [key: string]: ItemWithEditor
}

type PerkHash = number
type ExportName = string
type VariableName = string

export interface ItemDataTemplate {
   input: {
      perkHash: number
      itemHash: number
      type: string
   }
   selectedPerkHash: PerkHash
   description: {
      original: DescriptionWithEditor
      modified: DescriptionWithEditor
      descriptionsIce: DescriptionWithEditor
   }
   saved: {
      perks: {
         [key: PerkHash]: {
            [key: ExportName]: string
         }
      }
      variables: {
         [key: PerkHash]: {
            [key: VariableName]: string
         }
      }
   }
   displayHiddenPerks: boolean
}

export const itemData_context = createContext({} as ItemDataTemplate)
export const setItemData_context = createContext({} as Updater<ItemDataTemplate>)

const { descriptions, saved } = await getDescriptionClovis()
const descriptionsIce = await getDescriptionIce()
const { perks, variables } = saved

export function DataProvider({ children }: { children: JSX.Element }) {
   const defaultPerk = {
      id: 0,
      name: '',
      type: 'none' as const,
      description: [] as DescriptionLine[],
      lastUpdate: 0,
      updatedBy: '',
      editor: {
         mainEditor: '',
         secondaryEditor: ''
      },
      uploadToLive: false,
      visible: false
   }
   const [itemDataTemplate, setItemData] = useImmer<ItemDataTemplate>({
      input: {
         perkHash: 0,
         itemHash: 0,
         type: ''
      },
      selectedPerkHash: 0,
      description: {
         original: descriptions,
         modified: {
            ...descriptions,
            0: defaultPerk
         },
         descriptionsIce: descriptionsIce
      },
      saved: {
         perks: perks || {},
         variables: variables || {}
      },
      displayHiddenPerks: false
   })

   return (
      <itemData_context.Provider value={itemDataTemplate}>
         <setItemData_context.Provider value={setItemData}>{children}</setItemData_context.Provider>
      </itemData_context.Provider>
   )
}
