export // just to avoid error messages

type SelectableType =
   | 'armorExotic'
   | 'armorMod'
   // ---------
   | 'weaponPerkExotic'
   | 'weaponFrameExotic'
   | 'weaponPerk'
   | 'weaponPerkEnhanced'
   | 'weaponFrame'
   | 'weaponMod'
   | 'weaponCatalystExotic'
   // ---------
   | 'ghostMod'
   | 'artifactMod'
   // ---------
   | 'none'

interface DescriptionLine {
   /**
    ** Custom class names used to style the description
    ** Should be used with css file provided // change css file to fit your use case
    */
   classNames?: string[]
   /**
    * Single line of description containing information about that line
    */
   // linesContent?: LinesContent[]
   /**
    ** Is this table only contains information what has to calculated
    ** It will be true or nothing at all
    */
   isFormula?: true
   /**
    ** Custom formatting for the description can contain multiple lines
    ** 
    */
   table?: {
      /**
       * Single line of description containing information about that line
       */
      // linesContent?: LinesContent[]
   }[]
}

// All descriptions will have this information
interface BasePerkInfo {
   /**
    * Hash of the perk from Destiny Inventory Item Definition
    */
   hash: number
   /**
    * Name of the perk
    */
   name: string

   /**
    ** Hash of the item from Destiny Inventory Item Definition
    ** This is not reliable information for example Aeon exotics have 1 perk each instead of each Aeon having all 3 perks
    */
   itemHash?: number
   /**
    ** Name of item perk can be found on
    ** This is not reliable information for example Aeon exotics have 1 perk each instead of each Aeon having all 3 perks
    */
   itemName?: string

   /**
    ** Type of perk/mod
    ** weaponPerk, armorExotic, artifactMod, weaponMod, etc.
    */
   type: SelectableType

   // description: Description[]
   // simpleDescription?: Description[]

   // stats?: { [key: string]: any }

   lastUpdate: number
   /**
    * Name of person who update description last
    */
   updatedBy: string
   /**
    ** Dose perk description only has investment stats
    ** It will be true or nothing at all
    */
   investmentStatOnly?: true
}
