export interface ItemDataTemplate {
   inputData: {
      inputId: string
      type: 'none' | 'armorExotic' | 'armorMods' | 'weaponPerks' | 'weaponFrames' | 'weaponMods'
      rarity: string
   }
   perkData: { // selected perk or perk fetched from bungie
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