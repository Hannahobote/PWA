// imports all the components. Later on only use this one file and import it to html to get acces to the components ?
import './components/my-window/my-window.js'
import './components/memory-game/memory-game.js'
import './components/memory-game/memory-game2.js'

/**
 * Define template.
 */
 const template = document.createElement('template') 
 template.innerHTML = `

 <style>
 body {
   font-family: Arial, Helvetica, sans-serif;
 }

 
 </style>
 
 <my-window></my-window>
 <!--<memory-game></memory-game>-->
 <memory-gametwo></memory-gametwo>
 
 `

 /**
  * Runs the app.
  */
 class myApp extends HTMLElement {
  constructor() {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true)) // viktigt !!!!.
    // Get elemens here 
    // TODO: Maybee you need to define some default values here
  }
 }

 window.customElements.define('my-app', myApp);