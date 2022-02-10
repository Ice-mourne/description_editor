type itemInfo = {
   id: number
   name: string
   armorId?: number
   armorName?: string
   description: string
}

const fetchBungie = async (id: string): Promise<any> => {
   return new Promise((resolve, reject) => {
      fetch(`https://www.bungie.net/Platform/Destiny2/Manifest/DestinyInventoryItemDefinition/${id}`, {
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

export function getDataFromBungie(id: string) {
   const extractFromArmor = async (item: any): Promise<itemInfo> => {
      const armorPerkId = item.sockets.socketEntries[11].singleInitialItemHash
      const perk = await fetchBungie(armorPerkId)
      let itemData = {
         id: perk.hash,
         name: perk.displayProperties.name,
         armorId: item.hash,
         armorName: item.displayProperties.name,
         description: perk.displayProperties.description
      }
      return itemData
   }
   const extractFromMod = (item: any): itemInfo => {
      return {
         id: item.hash,
         name: item.displayProperties.name,
         description: item.displayProperties.description
      }
   }
   return fetchBungie(id)
      .then((item) => (item.itemType == 2 ? extractFromArmor(item) : extractFromMod(item)))
      .catch(console.error)
}
