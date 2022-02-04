import styles from '@styles/itemPopup/Description.module.scss'

interface Description {
   lineText?: LineText[]
   className?: string
   table?: Table[]
}
interface Table {
   lineText: LineText[]
   className?: string
}
interface LineText {
   text?: string
   className?: string
   formulaText?: string
   formula?: string
   title?: string
   linkText?: string
   linkUrl?: string
}

const calculateStat = (formula: string) => {
   if(formula) return `${Math.round(Math.random() * 1000)}ms`
}

const otherOptions = (options: any) => {
   if (options.linkUrl) return <a href={options.linkUrl}>{options.linkText}</a>
   if (options.formula || options.formulaText) return <span>{options.formulaText} {calculateStat(options.formula)}</span>
}

const joinClassNames = (classNames: string | undefined) => {
   return classNames
      ?.split(' ')
      .map((className: string) => styles[className])
      .join(' ')
}
export function Description({ itemData }: any): JSX.Element {
   const descriptionLine = (line: Description, i: number) => (
      <div className={joinClassNames(line.className)} key={i}>
         {line.lineText?.map((text, i) => (
            <span className={joinClassNames(text.className)} title={text.title} key={i}>
               {text.text || otherOptions(text)}
            </span>
         ))}
      </div>
   )
   // styles[text.className as string]
   const descriptionTable = (table: Table[], i: number) => (
      <div className={styles.table} key={i}>
         {table.map((line, i) => descriptionLine(line, i))}
      </div>
   )
   // console.log(itemData.description)

   const completeDescription = (description: any) => {
      if (!description) return
      return description?.map((description: any, i: number) =>
         description?.table ? descriptionTable(description.table, i) : descriptionLine(description, i)
      )
   }

   return <div>{completeDescription(itemData.description)}</div>
}
