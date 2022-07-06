export function statStringToStatArray(stats?: { [key: string]: any }) {
   if (!stats) return
   const statsArr = { ...stats }
   const converter = (stats: any) => {
      for (const key in stats) {
         if (typeof stats[key] == 'string' && stats[key] != '') {
            stats[key] = stats[key].split(',').map((stat: string) => Number(stat))
         }
         if (typeof stats[key] != 'object') continue
         converter(stats[key])
      }
      return stats
   }
   return converter(statsArr)
}
