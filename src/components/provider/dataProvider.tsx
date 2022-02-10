import React, { useContext, useState } from 'react'

interface ItemDataTemplate {
   inputData: {
      inputId: string
      type: 'none' | 'armorExotic' | 'armorMods' | 'weaponPerks' | 'weaponFrames' | 'weaponMods'
      rarity: string
   }
   perkData: {
      id: number
      name: string
      armorId: number
      armorName: string
      defaultDescription: string
      descriptions: {
         mainEditor: string
         secondaryEditor: string
      }
   }
   dataFromEditor: {
      mainEditor: object
      secondaryEditor: object
   }
}

export const itemData_context = React.createContext({} as ItemDataTemplate)
export const setItemData_context = React.createContext({} as React.Dispatch<React.SetStateAction<ItemDataTemplate>>)

export function DataProvider({ children }: { children: JSX.Element }) {
   const [itemDataTemplate, setItemData] = useState<ItemDataTemplate>({
      inputData: {
         inputId: '',
         type: 'none',
         rarity: ''
      },
      perkData: {
         id: 0,
         name: 'Fading Memory',
         armorId: 0,
         armorName: '',
         defaultDescription: '',
         descriptions: {
            mainEditor: '',
            secondaryEditor: ''
         }
      },
      dataFromEditor: {
         mainEditor: {} as any,
         secondaryEditor: {} as any
      }
   })

   return (
      <itemData_context.Provider value={itemDataTemplate}>
         <setItemData_context.Provider value={setItemData}>{children}</setItemData_context.Provider>
      </itemData_context.Provider>
   )
}
