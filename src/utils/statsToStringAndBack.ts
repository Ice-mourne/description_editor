export function statsStringToArray(str: string): number[] {
   const statsArr = str.split(',')
   return statsArr.flatMap((stat) => {
      const cleanStat = stat.trim().match(/\d+\.\d+|\d+/)?.[0]
      if (cleanStat) return Number(stat)
      return []
   })
}

export function statsArrayToString(array: string[] | undefined): string {
   if (array === undefined) return ''
   return array.join(', ')
}
