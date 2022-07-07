import _ from 'lodash'

export function removeEmptyFromObj<T>(dirtyObject: T): T {
   const obj = _.cloneDeep(dirtyObject)
   const remover = (obj: any) => {
      for (const key in obj) {
         if (obj[key] === null || obj[key] === '' || obj[key] === undefined) delete obj[key]
         if (!obj[key] || typeof obj[key] !== 'object') continue
         remover(obj[key])
         if (Object.keys(obj[key]).length === 0) delete obj[key]
      }
      return obj
   }
   return remover(obj)
}

// export function removeEmptyFromObj(obj) {
//    const remover = (obj) => {
//       for (const key in obj) {
//          if (obj[key] === null || obj[key] === '' || obj[key] === undefined) delete obj[key]
//          if (!obj[key] || typeof obj[key] !== 'object') continue
//          remover(obj[key])
//          if (Object.keys(obj[key]).length === 0) delete obj[key]
//       }
//       return obj
//    }
//    return remover(obj)
// }