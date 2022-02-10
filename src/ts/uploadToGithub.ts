interface ItemData {
   inputId: string
   id: number
   name: string
   armorId: number
   armorName: string
   description: string
   type: 'armorExotic' | 'armorMods' | 'weaponPerks' | 'weaponFrames' | 'weaponMods'
   editor: {
      mainEditor: any
      secondaryEditor: any
   }
}

import { github } from './fetch'

export async function uploadToGithub(itemData: ItemData): Promise<void> {
   const conditional = {
      armorName: itemData.armorName ? itemData.armorName : undefined,
      armorId: itemData.armorId ? itemData.armorId : undefined,
      secondaryEditor: itemData.editor.secondaryEditor.length > 0 ? itemData.editor.secondaryEditor : undefined
   }

   const item = {
      [itemData.type]: {
         [itemData.id]: {
            name: itemData.name,
            id: itemData.id,
            armorName: conditional.armorName,
            armorId: conditional.armorId,
            description: itemData.editor.mainEditor,
            simpleDescription: conditional.secondaryEditor,
            lastUpdate: new Date()
         }
      }
   }
   console.log(JSON.stringify(item, null, 2))

   const { status, content, sha } = await github('getDescription')
   github('putDescription', { sha: sha, content: { ...content[itemData.type], ...item[itemData.type] } })
}
