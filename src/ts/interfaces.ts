//--- fetch.ts
export namespace Fetch {
   export type PossibleOptions = 'getDescription' | 'putDescription'
   export interface Options {
      [key: string]: {
         method: string
         link:   string
         token:  string
         body?: {
            sha:     string
            branch:  string
            message: string
            content: string
         }
      }
   }
   export interface Response {
      status:  number
      content: string
      sha:     string
   }
}














//--- Bellow is just placeholder

export interface ClarityDescription {
   armorExotic:  { [key: string]: ArmorExotic }
   armorMods:    { [key: string]: ModsPerks   }
   weaponPerks:  { [key: string]: ModsPerks   }
   weaponFrames: { [key: string]: ModsPerks   }
   weaponMods:   { [key: string]: ModsPerks   }
}

export interface ArmorExotic {
   name:               string // Armor perk name
   id:                 string // Armor perk id
   itemName:           string // Armor name
   itemId:             string // Armor id
   description:        Description[]
   simpleDescription?: Description[] // shorter simpler description
   lastUpdate:         string // Last time description was updated
}

export interface ModsPerks {
   name:               string // Mod, perk, frame name
   id:                 string // Mod, perk, frame id
   description:        Description[]
   simpleDescription?: Description[] // shorter simpler description
   stats?:             Stats  // Community gathered stats
   lastUpdate:         string // Last time description was updated
   exotic?:            boolean // True then perk, frame is only on exotic weapon // nothing on mods, armor
}

export interface Description {
   lineText?:  LineText[] // Array of objects used to construct line
   className?: string // Css class name applies to entire line // text in line have its own class name
   table?:     Table[] // Description in table format
}

export interface Table {
   lineText:   LineText[] // Row in table
   className:  string // Css class name applies to table // always 'table'
}

export interface LineText {
   text?:        string // Text inline
   className?:   string // CSS class name applies to part of line or column (not entire column more like a single cell in a spreadsheet)
   formulaText?: string // Text in the formula for example "In-Game range" if you don't calculate stats skip this
   formula?:     string // This is an identifier for a formula to tell what kind of formula is it
   title?:       string // Some extra information about a text I use this for hover over info
   linkText?:    string // Link label
   linkUrl?:     string // Link url
}

export interface Stats {
   chargeDraw?:   ActivePassive
   damage?:       ActivePassive
   range?:        ActivePassive
   stability?:    ActivePassive
   handling?:     ActivePassive
   reload?:       ActivePassive
   aimAssist?:    ActivePassive
   zoom?:         ActivePassive
   magazineSize?: ActivePassive // probably will be removed
}

export interface ActivePassive {
   active?:  StatMultiplier // Stats you then some condition is met like killing enemy
   passive?: StatMultiplier // Stats you get just by having this perk
}

export interface StatMultiplier {
   stat?:       number[] // Flat stat this is not investment stat
   multiplier?: number[] // Multiplier used on final value
}