// Generated by https://quicktype.io

export interface K {
   hash:                number;
   name:                string;
   itemHash:            number | null;
   itemName?:           string;
   lastUpdate:          number;
   updatedBy:           string;
   type:                string;
   description:         Description[];
   stats?:              Stats;
   investmentStatOnly?: boolean;
}

export interface Description {
   linesContent?: Array<DescriptionLinesContent | null>;
   classNames?:   Array<null | string>;
   table?:        Array<Table | null>;
   isFormula?:    boolean;
}

export interface DescriptionLinesContent {
   text?:       string;
   classNames?: string[];
   formula?:    string;
   title?:      string;
   link?:       string;
}

export interface Table {
   linesContent?: Array<TableLinesContent | null>;
   classNames?:   Array<null | string>;
}

export interface TableLinesContent {
   text?:       string;
   classNames?: Array<null | string>;
}

export interface Stats {
   reload?:         Reload;
   handling?:       ChargeDraw;
   damage?:         Damage;
   chargeDrawTime?: ChargeDraw;
   chargeDraw?:     ChargeDraw;
   range?:          Range;
   stability?:      Stability;
   aimAssist?:      AimAssist;
   stow?:           Draw;
   draw?:           Draw;
   zoom?:           Zoom;
}

export interface AimAssist {
   active?:  AimAssistActive;
   passive?: AimAssistActive;
}

export interface AimAssistActive {
   stat: number[];
}

export interface ChargeDraw {
   passive?: AimAssistActive;
   active?:  DrawActive;
}

export interface DrawActive {
   stat?:       number[];
   multiplier?: number[];
}

export interface Damage {
   active?:  DamageActive;
   passive?: DamageActive;
}

export interface DamageActive {
   multiplier: number[];
}

export interface Draw {
   active: DrawActive;
}

export interface Range {
   active?:  DrawActive;
   passive?: DamageActive;
}

export interface Reload {
   active?:  DrawActive;
   passive?: DrawActive;
}

export interface Stability {
   active: AimAssistActive;
}

export interface Zoom {
   passive: DamageActive;
}