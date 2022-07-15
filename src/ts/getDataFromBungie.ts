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

export function getDataFromBungie(perkHash: number, itemHash: number, type: string) {
   const extractFromArmor = async () => {
      const item = await fetchBungie(perkHash)
      const armorPerkId = item.sockets.socketEntries[11].singleInitialItemHash
      const perk = await fetchBungie(armorPerkId)
      let itemData = {
         id: Number(perk.hash),
         name: String(perk.displayProperties.name),
         itemId: Number(item.hash),
         itemName: String(item.displayProperties.name),
         editor: {
            mainEditor: perk.displayProperties?.description || '',
            secondaryEditor: perk.displayProperties?.description || ''
         }
      }
      return itemData as ItemWithEditor
   }

   const extractFromWeapon = async () => {
      const item = await fetchBungie(itemHash)
      const perk = await fetchBungie(perkHash)
      return {
         id: Number(perk.hash),
         name: String(perk.displayProperties.name),
         itemId: Number(item.hash),
         itemName: String(item.displayProperties.name),
         editor: {
            mainEditor: perk.displayProperties?.description || '',
            secondaryEditor: perk.displayProperties?.description || ''
         }
      } as ItemWithEditor
   }

   const extractFromEverythingElse = async () => {
      const perk = await fetchBungie(perkHash)
      return {
         id: Number(perk.hash),
         name: String(perk.displayProperties.name),
         editor: {
            mainEditor: perk.displayProperties?.description || '',
            secondaryEditor: perk.displayProperties?.description || ''
         }
      } as ItemWithEditor
   }
   switch (type) {
      case 'weaponPerkExotic':
      case 'weaponFrameExotic':
      case 'weaponCatalystExotic':
         return extractFromWeapon()

      case 'armorExotic':
         return extractFromArmor()

      default:
         return extractFromEverythingElse()
   }
}
