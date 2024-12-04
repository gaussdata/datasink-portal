export function onDOMContentLoaded(callback: Function){
  window.addEventListener('DOMContentLoaded', callback())  
}

export function onLoaded(callback: Function){
  window.addEventListener('loaded', callback())  
}

export function onResize(callback: Function){
  window.addEventListener('resize', callback())  
}

export default {}