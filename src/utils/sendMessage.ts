export function sendMessage(message: string) {
   const event = new CustomEvent('custom', { detail: message });
   document.querySelector('#app')?.dispatchEvent(event)
}