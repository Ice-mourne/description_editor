import { DescriptionWithEditor } from "@components/provider/dataProvider"

export function converter(data: DescriptionWithEditor) {
   const newData = Object.keys(data).reduce((acc, key) => {
      const item = data[key]

      acc[key] = {
         ...item,
         id: Number(item.id),
         itemId: item.itemId ? Number(item.itemId) : undefined,
         inLiveDatabase: item.inLiveDatabase ? true : false,
         lastUpdate: item.lastUpdate ? Number(item.lastUpdate) : Date.now(),
         updatedBy: item.updatedBy ? item.updatedBy : 'Icemourne'
      }

      return acc
   }, {} as DescriptionWithEditor)

   return newData
}
