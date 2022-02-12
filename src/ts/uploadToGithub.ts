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
      converted: {
         mainEditor: object
         secondaryEditor: object
      },
      original: {
         mainEditor: string
         secondaryEditor: string
      }
   },
   dataFromGithub: {}
}

import { github } from './fetch'
import { ClarityDescription, Fetch } from './interfaces'

export async function uploadToGithub(itemData: ItemDataTemplate): Promise<ClarityDescription> {
   const conditional = {
      armorName: itemData.perkData.armorName ? itemData.perkData.armorName : undefined,
      armorId: itemData.perkData.armorId ? itemData.perkData.armorId : undefined,
      secondaryEditor:
         Object.keys(itemData.dataFromEditor.converted.secondaryEditor).length > 0
            ? itemData.dataFromEditor.converted.secondaryEditor
            : undefined
   }

   const item = {
      name: itemData.perkData.name,
      id: itemData.perkData.id,
      armorName: conditional.armorName,
      armorId: conditional.armorId,
      description: itemData.dataFromEditor.converted.mainEditor,
      simpleDescription: conditional.secondaryEditor,
      editor: {
         mainEditor: itemData.dataFromEditor.original.mainEditor,
         secondaryEditor: itemData.dataFromEditor.original.secondaryEditor
      },
      lastUpdate: new Date()
   }
   const { status, content, sha } = (await github('getDescription')) as Fetch.Response

   if (content[itemData.inputData.type] == undefined) content[itemData.inputData.type] = {}
   content[itemData.inputData.type][itemData.perkData.id] = item
   github('putDescription', {
      sha,
      content
   })
   // used to update data in the editor website
   return content
}
