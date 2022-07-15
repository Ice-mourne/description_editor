import { ItemWithEditor } from '@components/provider/dataProvider'
import { bungieManifest } from '@data/urls'

const fetchBungie = async (id: number): Promise<any> => {
   return new Promise((resolve, reject) => {
      fetch(`${bungieManifest}${id}`, {
         method: 'GET',
         mode: 'cors',
         headers: {
            'X-API-Key': 'cda7b6e4fc9f49ada4fed618e11841ab'
         }
      })
         .then((resp) => resp.json())
         .then((resp) => resolve(resp.Response))
         .catch(reject)
   })
}

export function getDataFromBungie(id: number) {
   const extractFromArmor = async (item: any): Promise<ItemWithEditor> => {
      const armorPerkId = item.sockets.socketEntries[11].singleInitialItemHash
      const perk = await fetchBungie(armorPerkId)
      let itemData = {
         id: Number(perk.hash),
         name: String(perk.displayProperties.name),
         itemId: Number(item.hash),
         itemName: String(item.displayProperties.name)
      }
      return itemData as ItemWithEditor
   }
   const extractFromEverythingElse = (item: any): ItemWithEditor => {
      return {
         id: Number(item.hash),
         name: String(item.displayProperties.name),
         editor: {
            mainEditor: item.displayProperties?.description || '',
            secondaryEditor: item.displayProperties?.description || ''
         },
      } as ItemWithEditor
   }
   const extractFromWeapon = (item: any): ItemWithEditor => {
      return {
         id: 69420,
         name: 'add perk now',
         itemId: Number(item.hash),
         itemName: String(item.displayProperties.name)
      } as ItemWithEditor
   }
   return fetchBungie(id)
      .then((item) =>
         item.itemType == 2
            ? extractFromArmor(item)
            : item.itemType == 3
            ? extractFromWeapon(item)
            : extractFromEverythingElse(item)
      )
      .catch(console.error)
}
