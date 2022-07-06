import { useEffect } from "react"

export const item_preview = {
   ammo: {
      img: 'https://bungie.net/common/destiny2_content/icons/b6d3805ca8400272b7ee7935b0b75c79.png',
      type: 'special'
   },
   breaker: {
      img: 'https://www.bungie.net/common/destiny2_content/icons/DestinyBreakerTypeDefinition_825a438c85404efd6472ff9e97fc7251.png',
      type: 'special'
   },
   element: {
      img: 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_530c4c3e7981dc2aefd24fd3293482bf.png',
      type: 'special'
   },
   power: 69420,
   name: `FADING SHADOW'S BURDEN`
}

function externalEventHandler(handler: Function, targetName: string, eventType: keyof HTMLElementEventMap) {
   useEffect(() => {
      const listener = <T>(e: T) => handler(e)

      const target = document.querySelector(targetName) as HTMLElement
      target.addEventListener(eventType, listener)

      return () => target.removeEventListener(eventType, listener)
   }, [handler])
}