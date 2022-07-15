export function doMath(description: string) {
   /*
   (
      -?\d+       = one or more positive / negative digit
      (\.\d+)?    = .one or more digit
   )
   (
      \s{0,9}            = optional spaces
      [+\-/*]     = one of +, -, *, /
      \s{0,9}         = optional spaces
      (
         -?\d+    = one or more positive / negative digit
         (\.\d+)? = .one or more digit
      )
   )
   {0,99}         = allow last block 0 to 99 times
   */
   const mathRegex = /(-?\d+(\.\d+)?)(\s{0,9}[+\-/*]\s{0,9}(-?\d+(\.\d+)?)){0,99}/

   // simple math
   if (/\${.+?}/.test(description) && mathRegex.test(description)) {
      const devil = (string: string) => {
         return new Function('return ' + string)() // don't do this its fine here because its sanitized
      }
      const mathStuff = description.match(/\${.+?}/g)
      if (!mathStuff) return description

      mathStuff.forEach((math) => {
         const string = math.match(mathRegex)?.[0]
         if (!string) return
         description = description.replace(math, devil(string))
      })
   }
   return description
}
