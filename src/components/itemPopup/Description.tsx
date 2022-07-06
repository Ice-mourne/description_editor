import { Description, LinesContent } from '@components/provider/dataProvider'
import styles from './Description.module.scss'

const calculateStat = (formula?: string) => {
   if (formula) {
      if (/range/i.test(formula)) {
         return `${Math.round(Math.random() * 100)}m`
      }
      return `${Math.round(Math.random() * 1000)}ms`
   }
}

const otherOptions = (linesContent: LinesContent) => {
   if (linesContent?.link) return <a href={linesContent.link}>{linesContent.text}</a>
   if (linesContent?.formula)
      return (
         <span>
            {linesContent.text} {calculateStat(linesContent.formula)}
         </span>
      )
   return null
}

const joinClassNames = (classNames: (string | null)[] | undefined) => {
   return classNames
      ?.flatMap((className: string | null) => {
         if (className === null) return []
         return styles[className]
      })
      .join(' ')
}
export function DescriptionBuilder({ description }: { description: Description[] }): JSX.Element {
   const descriptionLine = (description: Description, i: number) => (
      <div className={joinClassNames(description.classNames)} key={i}>
         {description?.linesContent?.map((linesContent, i) => (
            <span className={joinClassNames(linesContent?.classNames)} title={linesContent?.title} key={i}>
               {otherOptions(linesContent) || linesContent?.text}
            </span>
         ))}
      </div>
   )

   const descriptionTable = (description: Description, i: number) => (
      <div className={joinClassNames(description?.classNames)} key={i}>
         {description?.table?.map((linesContent, i) => descriptionLine(linesContent, i))}
      </div>
   )

   const buildDescription = (description: Description[]) => {
      if (!description || description.length === 0) return

      return description.map((descriptionObj: Description, i: number) =>
         descriptionObj?.table ? descriptionTable(descriptionObj, i) : descriptionLine(descriptionObj, i)
      )
   }

   return <div className={styles.description}>{buildDescription(description)}</div>
}
