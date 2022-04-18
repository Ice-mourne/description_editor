import { itemData_context, setItemData_context } from '@components/provider/dataProvider'
import { useContext, useState } from 'react'

export function removeEmptyFromObj<T>(dirtyObject: T): T {
   const obj = { ...dirtyObject }
   const remover = (obj: any) => {
      for (const key in obj) {
         if (obj[key] === null || obj[key] === '') delete obj[key]
         if (!obj[key] || typeof obj[key] !== 'object') continue
         remover(obj[key])
         if (Object.keys(obj[key]).length === 0) delete obj[key]
      }
      return obj
   }
   return remover(obj)
}

export function useErrorSuccessMessage(message: string) {
   const setItemData = useContext(setItemData_context)
   const itemData = useContext(itemData_context)

   const max = itemData.message?.length > 0 ? Math.max(...itemData.message.map((message) => message.number)) : 0

   setItemData((itemData) => {
      return {
         ...itemData,
         message: [
            {
               jsx: <span key={max + 1}>{message}</span>,
               number: max + 1
            }
         ]
      }
   })

   setTimeout(() => {
      setItemData((itemData) => {
         return {
            ...itemData,
            message: itemData.message.filter((message) => message.number !== max + 1)
         }
      })
   }, 10000)
}

export function statStringToStatArray(stats?: { [key: string]: any }) {
   if (!stats) return
   const statsArr = { ...stats }
   const converter = (stats: any) => {
      for (const key in stats) {
         if (typeof stats[key] == 'string' && stats[key] != '') {
            stats[key] = stats[key].split(',').map((stat: string) => Number(stat))
         }
         if (typeof stats[key] != 'object') continue
         converter(stats[key])
      }
      return stats
   }
   return converter(statsArr)
}
