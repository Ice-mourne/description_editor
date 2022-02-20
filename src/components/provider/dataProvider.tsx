import { ClarityDescription, ItemDataTemplate } from '@interfaces'
import React, { useEffect, useState } from 'react'
import { getDataFromGithub, getUnauthorizedDescription, githubGet } from '@ts/github'

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
         itemId: undefined,
         itemName: undefined,
         lastUpdate: '',
         // descriptions: { // just remove this is not used anywhere most likely
         //    mainEditor: '',
         //    secondaryEditor: ''
         // }
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
      dataFromGithub: {} as ClarityDescription,
      error: ''
   })

   const newData = {
      inputData: {
         Id: '',
         descriptionType: 'none',
         rarity: ''
         
      },
      perkData: {
         id: 0,
         name: '',
         itemId: 0,              // optional
         itemName: '',           // optional
         stats: {},              // optional
         advanceStats: {},       // optional
         lastUpdate: '',
      },
   }

   useEffect(() => {
      getUnauthorizedDescription().then((data) => {
         setItemData((itemData) => ({ ...itemData, dataFromGithub: data }))
      })

      githubGet('getRateLimit').then(console.log)
   }, [])

   return (
      <itemData_context.Provider value={itemDataTemplate}>
         <setItemData_context.Provider value={setItemData}>{children}</setItemData_context.Provider>
      </itemData_context.Provider>
   )
}
