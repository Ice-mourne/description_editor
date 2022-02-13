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

import { ClarityDescription, Fetch } from './interfaces'

import { github } from './fetch'

export async function uploadToGithub(itemData: ItemDataTemplate) {
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

   // const updatedContent = 
   // console.log(updatedContent);
   
   github('putDescription', {
      sha,
      content: {
         ...content,
         [itemData.inputData.type]: {
            ...content[itemData.inputData.type],
            [item.id]: item
         }
      }
   })
   // used to update data in the editor website
   // return updatedContent
}

export async function getDataFromGithub() {
   const { status, content } = (await github('getDescription')) as Fetch.Response
   return content
}
