//----------------------------------------------------------------------------------------------------------------------
//?     ts/github.ts
//----------------------------------------------------------------------------------------------------------------------
export type FetchOptionsGet = 'getDescriptionClovis' | 'getDescriptionIce' | 'getRateLimit'
export type FetchOptionsPut = 'putDescriptionClovis' | 'putDescriptionIce'

export interface RespJson {
   content: string
   sha:     string
}

export interface DataToSend {
   sha:     string
   content: ClarityDescription
}

export interface GithubData {
   sha:     string
   content: ClarityDescription
}

//! --------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
//?     universal
//----------------------------------------------------------------------------------------------------------------------
export interface ItemDataTemplate {
   inputData: {
      inputId: string
      type:    'none' | 'armorExotic' | 'armorMods' | 'weaponPerks' | 'weaponFrames' | 'weaponMods'
      rarity:  string
   }
   /**
    * Data for selected perk from Bungie or GitHub
    */
   perkData: {
      id:                 number
      name:               string
      armorId?:           number
      armorName?:         string
      defaultDescription: string
      lastUpdate?:        number | string
      /**
       * Data used in editor not converted
       */
      descriptions: {
         mainEditor?:      string
         secondaryEditor?: string
      }
   }
   dataFromEditor: {
      converted: {
         mainEditor:      object
         secondaryEditor: object
      },
      original: {
         mainEditor:      string
         secondaryEditor: string
      }
   },
   dataFromGithub?: ClarityDescription
   error?:          string
}

export interface ClarityDescription {
   armorExotic:  { [key: string]: Items }
   armorMods:    { [key: string]: Items }
   weaponPerks:  { [key: string]: Items }
   weaponFrames: { [key: string]: Items }
   weaponMods:   { [key: string]: Items }
   none:         { [key: string]: Items } //! this will never be used
}

export interface Items {
   name:               string          // Armor perk name
   id:                 string | number // Armor perk id
   armorName?:         string          // Armor name
   armorId?:           string | number // Armor id
   description:        Description[]
   simpleDescription?: Description[]   // shorter simpler description
   lastUpdate:         number | string // Last time description was updated in milliseconds elapsed since January 1, 1970 00:00:00 UTC.
   stats?:             Stats           // Community gathered stats
   exotic?:            boolean         // True then perk, frame is only on exotic weapon // nothing on mods, armor
   /**
    * Data used in editor not converted
    */
   editor?: {
      mainEditor:      string          // Editor's main description
      secondaryEditor: string          // Editor's secondary description
   }
}

interface Description {
   lineText?:  LineText[] // Array of objects used to construct line
   className?: string     // Css class name applies to entire line // text in line have its own class name
   table?:     Table[]    // Description in table format
}

interface Table {
   lineText:   LineText[] // Row in table
   className:  string     // Css class name applies to table // always 'table'
}

interface LineText {
   text?:        string // Text inline
   className?:   string // CSS class name applies to part of line or column (not entire column more like a single cell in a spreadsheet)
   formulaText?: string // Text in the formula for example "In-Game range" if you don't calculate stats skip this
   formula?:     string // This is an identifier for a formula to tell what kind of formula is it
   title?:       string // Some extra information about a text I use this for hover over info
   linkText?:    string // Link label
   linkUrl?:     string // Link url
}

interface Stats {
   chargeDraw?:   ActivePassive
   damage?:       ActivePassive
   range?:        ActivePassive
   stability?:    ActivePassive
   handling?:     ActivePassive
   reload?:       ActivePassive
   aimAssist?:    ActivePassive
   zoom?:         ActivePassive
   magazineSize?: ActivePassive //! probably will be removed
}

interface ActivePassive {
   active?:  StatMultiplier // Stats you then some condition is met like killing enemy
   passive?: StatMultiplier // Stats you get just by having this perk
}

interface StatMultiplier {
   stat?:       number[] // Flat stat this is not investment stat
   multiplier?: number[] // Multiplier used on final value
}
//! --------------------------------------------------------------------------------------------------------------------