/**
 * Creates nested object and adds value to it.
 * @param obj Object to create nested object in
 * @param path Array of keys to create nested object
 * @param value Value to assign to nested object
 */
export function createNestedObject(obj: any, path: Array<string | number>, value: unknown) {
   if (path.length === 1) {
      obj[path[0]] = value
   } else {
      if (!obj?.[path[0]]) obj[path[0]] = {}
      createNestedObject(obj[path[0]], path.slice(1), value)
   }
}
