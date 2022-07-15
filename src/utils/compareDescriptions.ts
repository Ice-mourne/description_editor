import { DescriptionWithEditor } from '@components/provider/dataProvider'
import _ from 'lodash'

/**
 * Compares descriptions and returns hashes of perks where something was changed
 */
export const compareDescriptions = (original: DescriptionWithEditor = {}, modified: DescriptionWithEditor = {}) => {
   const originalKeys = Object.keys(original)
   const modifiedKeys = Object.keys(modified)

   const keys = [...new Set([...originalKeys, ...modifiedKeys])]

   const differences = keys
      .map((key) => {
         const lastUpdate = original[key]?.lastUpdate || 0
         const originalValue = { ...original[key], lastUpdate }
         const modifiedValue = { ...modified[key], lastUpdate }

         if (_.isEqual(originalValue, modifiedValue)) return null
         return key
      })
      .filter((diff) => diff !== null)

   return differences as string[]
}
