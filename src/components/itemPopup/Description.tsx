import { DescriptionLine, ItemWithEditor, LinesContent, RowContent } from '@components/provider/dataProvider'
import { useState } from 'react'
import styles from './Description.module.scss'

const calculateStat = (formula?: string) => {
   if (formula) {
      if (/range/i.test(formula)) {
         return ` ${Math.round(Math.random() * 100)}m`
      }
      return ` ${Math.round(Math.random() * 1000)}ms`
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

const joinClassNames = (classNames: (string | null | undefined)[] | undefined) => {
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
   description: DescriptionLine[]
   perk?: ItemWithEditor
}): JSX.Element {
   const [hoverPopup, setHoverPopup] = useState<JSX.Element | null>(null)

   const buildLine = (description: DescriptionLine, i: number) => (
      <div className={joinClassNames(description.classNames)} key={i}>
         {description?.linesContent?.map((linesContent, i) => (
            <span className={joinClassNames(linesContent?.classNames)} key={i}>
               {linesContent?.title ? (
                  <span
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

   const convertTableLine = (rowContent: RowContent, i: number) => (
      <td
         key={i}
         colSpan={rowContent.colSpan}
         rowSpan={rowContent.rowSpan}
         className={joinClassNames(rowContent?.classNames)}
      >
         {rowContent.cellContent?.map((cellContent, i) => (
            <span
               className={joinClassNames(cellContent?.classNames)}
               key={i}
               onMouseEnter={
                  cellContent?.title ? (e) => onHover(e, setHoverPopup, cellContent?.title, perk) : undefined
               }
               onMouseLeave={cellContent?.title ? (e) => onHover(e, setHoverPopup) : undefined}
            >
               {hoverPopup}
               {otherOptions(cellContent) || cellContent?.text}
            </span>
         ))}
      </td>
   )

   const buildTable = (lineWithTable: DescriptionLine, i: number) => (
      <table className={joinClassNames(lineWithTable?.classNames)} key={i}>
         {lineWithTable?.table?.map((tableLine, i) => (
            <tr className={joinClassNames(tableLine.classNames)} key={i}>
               {tableLine?.rowContent?.map((rowContent, i) => convertTableLine(rowContent, i))}
            </tr>
         ))}
      </table>
   )

   const buildDescription = (descriptionLines: DescriptionLine[]) => {
      if (!descriptionLines || descriptionLines.length === 0) return

      return descriptionLines.map((descriptionLine: DescriptionLine, i: number) =>
         descriptionLine?.table ? buildTable(descriptionLine, i) : buildLine(descriptionLine, i)
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
