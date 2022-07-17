import { Description, ItemWithEditor, LinesContent } from '@components/provider/dataProvider'
import { useState } from 'react'
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
         <>
            {linesContent.text} {calculateStat(linesContent.formula)}
         </>
      )
   return null
}

const joinClassNames = (classNames: (string | null  | undefined)[] | undefined) => {
   return classNames
      ?.flatMap((className: string | null | undefined) => {
         if (className === null || className === undefined) return []
         return styles[className]
      })
      .join(' ')
}

export function DescriptionBuilder({
   description,
   perk
}: {
   description: Description[]
   perk?: ItemWithEditor
}): JSX.Element {
   const [hoverPopup, setHoverPopup] = useState<JSX.Element | null>(null)

   const descriptionLine = (description: Description, i: number) => (
      <div className={joinClassNames(description.classNames)} key={i}>
         {description?.linesContent?.map((linesContent, i) => (
            <span className={joinClassNames(linesContent?.classNames)} key={i}>
               {linesContent?.title ? (
                  <span
                     className={styles.title}
                     onMouseEnter={(e) => onHover(e, setHoverPopup, linesContent?.title, perk)}
                     onMouseLeave={(e) => onHover(e, setHoverPopup)}
                  >
                     {hoverPopup}
                     {linesContent?.text}
                  </span>
               ) : (
                  otherOptions(linesContent) || linesContent?.text
               )}
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

   function onHover(
      e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
      setHoverPopup: React.Dispatch<React.SetStateAction<JSX.Element | null>>,
      name?: string,
      perk?: ItemWithEditor
   ) {
      if (e.type === 'mouseenter' && name && perk?.titles) {
         setHoverPopup(<div className={styles.titleContainer}>{buildDescription(perk.titles[name])}</div>)
      }
      if (e.type === 'mouseleave') {
         setHoverPopup(<></>)
      }
   }

   return <div className={styles.description}>{buildDescription(description)}</div>
}
