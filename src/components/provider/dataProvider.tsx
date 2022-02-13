import React, { useEffect, useState } from 'react'

import { ClarityDescription } from '@ts/interfaces'
import { ItemDataTemplate } from '@components/interfaces/editor'
import { getDataFromGithub } from '@ts/uploadToGithub'
import { github } from '@ts/fetch'

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
         converted: {
            mainEditor: {},
            secondaryEditor: {}
         },
         original: {
            mainEditor: '',
            secondaryEditor: ''
         }
      },
      dataFromGithub: {} as ClarityDescription
   })

   useEffect(() => {
      getDataFromGithub().then((data) => setItemData((itemData) => ({ ...itemData, dataFromGithub: data })))
      
      github('rateLimit')
      .then(console.log)
   },[])

   return (
      <itemData_context.Provider value={itemDataTemplate}>
         <setItemData_context.Provider value={setItemData}>{children}</setItemData_context.Provider>
      </itemData_context.Provider>
   )
}
