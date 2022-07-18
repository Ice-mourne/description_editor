import _ from 'lodash'

export function cleanObject<T>(dirtyObject: T): T {
   const obj = _.cloneDeep(dirtyObject)
   const remover = (obj: any) => {
      for (const key in obj) {
         // remove null undefined
         if (obj[key] === null || obj[key] === undefined) delete obj[key]
         // remove empty strings
         if (typeof obj[key] === 'string' && obj[key].trim() === '') delete obj[key]
         if (!obj[key] || typeof obj[key] !== 'object') continue
         remover(obj[key])
         if (Object.keys(obj[key]).length === 0) delete obj[key]
      }
      return obj
   }
   return JSON.parse(JSON.stringify(remover(obj)))
}
