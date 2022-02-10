interface ItemDataTemplate {
   inputData: {
      inputId: string
      type: 'none' | 'armorExotic' | 'armorMods' | 'weaponPerks' | 'weaponFrames' | 'weaponMods'
      rarity: string
   }
   perkData: {
      id: number
      name: string
      armorId: number
      armorName: string
      defaultDescription: string
      descriptions: {
         mainEditor: string
         secondaryEditor: string
      }
   }
   dataFromEditor: {
      mainEditor: object
      secondaryEditor: object
   }
}

import { github } from './fetch'
import { Fetch } from './interfaces'

export async function uploadToGithub(itemData: ItemDataTemplate): Promise<void> {
   const conditional = {
      armorName: itemData.perkData.armorName ? itemData.perkData.armorName : undefined,
      armorId: itemData.perkData.armorId ? itemData.perkData.armorId : undefined,
      secondaryEditor:
         Object.keys(itemData.dataFromEditor.secondaryEditor).length > 0
            ? itemData.dataFromEditor.secondaryEditor
            : undefined
   }

   const item = {
      name: itemData.perkData.name,
      id: itemData.perkData.id,
      armorName: conditional.armorName,
      armorId: conditional.armorId,
      description: itemData.dataFromEditor.mainEditor,
      simpleDescription: conditional.secondaryEditor,
      lastUpdate: new Date()
   }
   const { status, content, sha } = (await github('getDescription')) as Fetch.Response

   if (content[itemData.inputData.type] == undefined) content[itemData.inputData.type] = {}
   content[itemData.inputData.type][itemData.perkData.id] = item
   github('putDescription', {
      sha,
      content
   })
}
