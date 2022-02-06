interface itemData {
   inputId: string
   id: number
   name: string
   armorId: number
   armorName: string
   description: string
   editor: {
      mainEditor: any
      secondaryEditor: any
   }
}



export function uploadToGithub(itemData: itemData) {
   const item = {
      [itemData.id]: {
         name: itemData.name,
         id: itemData.id,
         itemName: itemData.armorName,
         itemId: itemData.armorId,
         description: [],
         lastUpdate: ' string // Last time description was updated'
      }
   }
   console.log(itemData);
}