// import { ClarityDescription } from '@interfaces'

import React, { useEffect, useState } from 'react'
import { getUnauthorizedDescription, githubGet } from '@ts/github'

import { ItemDataTemplate } from 'src/interfaces_2'

export const itemData_context = React.createContext({} as ItemDataTemplate)
export const setItemData_context = React.createContext({} as React.Dispatch<React.SetStateAction<ItemDataTemplate>>)

export function DataProvider({ children }: { children: JSX.Element }) {
   const [itemDataTemplate, setItemData] = useState<ItemDataTemplate>({
      inputData: {
         id: '',
         type: undefined
      },
      ItemData: {
         id: 0,
         name: '',
         lastUpdate: ''
      },
      dataFromEditor: {
         converted: {
            mainEditor: [],
            secondaryEditor: []
         },
         original: {
            mainEditor: '',
            secondaryEditor: ''
         }
      },
      dataFromGithub: {},
      message: ''
   })

   useEffect(() => {
      getUnauthorizedDescription().then((data) => {
         if (!data) setItemData((itemData) => ({ ...itemData, message: 'AdBlock Error' }))
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
