import { createContext } from 'react'

import { getDescriptionClovis, getDescriptionIce } from '@utils/fetchDescriptions'
import { Updater, useImmer } from 'use-immer'

export interface LinesContent {
   text?: string
   classNames?: (string | null)[]
   link?: string
   formula?: string
   title?: string
}

export interface Description {
   classNames?: (string | null)[]
   linesContent?: LinesContent[]
   isFormula?: boolean | null
   table?: { linesContent?: LinesContent[] }[]
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
   //---------
   | 'none'

export interface Item {
   id: number
   name: string

   itemId?: number
   itemName?: string

   type: SelectableType

   description: Description[]
   simpleDescription?: Description[]

   titles?: { [key: string]: Description[] }

   stats?: { [key: string]: any }

   lastUpdate: number
   updatedBy: string
}

export interface ItemWithEditor extends Item {
   editor?: {
      mainEditor: string
      secondaryEditor: string
   }
   inLiveDatabase?: boolean
}

export interface DescriptionWithEditor {
   [key: string]: ItemWithEditor
}

type PerkHash = number
type ExportName = string
type VariableName = string

export interface ItemDataTemplate {
   input: {
      id: number
      type: string
   }
   selectedPerkHash: PerkHash
   description: {
      original: DescriptionWithEditor
      modified: DescriptionWithEditor
      descriptionsIce: DescriptionWithEditor
   }
   markedForLive: PerkHash[]
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
      description: [] as Description[],
      lastUpdate: 0,
      updatedBy: '',
      editor: {
         mainEditor: '',
         secondaryEditor: ''
      }
   }
   const [itemDataTemplate, setItemData] = useImmer<ItemDataTemplate>({
      input: {
         id: 0,
         type: ''
      },
      selectedPerkHash: 0,
      description: {
         original: descriptions,
         modified: {
            ...descriptions,
            0: defaultPerk
         },
         descriptionsIce
      },
      markedForLive: [],
      saved: {
         perks: perks || {},
         variables: variables || {}
      }
   })

   return (
      <itemData_context.Provider value={itemDataTemplate}>
         <setItemData_context.Provider value={setItemData}>{children}</setItemData_context.Provider>
      </itemData_context.Provider>
   )
}
