// imports all the components. Later on only use this one file and import it to html to get acces to the components ?
import './components/my-window/my-window.js'
// import './components/memory-game/memory-game.js'
import './components/memory-game/memory-game2.js'
import './components/my-dock/my-dock.js'
import './components/my-icon/my-icon.js'

/**
 * Define template.
 */
 const template = document.createElement('template') 
 template.innerHTML = `

 <style>
 body {
   font-family: Arial, Helvetica, sans-serif;
 }

  my-dock {
  position: fixed;
  bottom: 0;
 }

 img {
   width: 50px;
   height: 50px;
 }
 
 </style>
 
 <my-window>
   <memory-gametwo></memory-gametwo>
   </my-window>

   <my-dock>
    <div slot="item1">  <my-icon> <img src="https://img.icons8.com/ios/250/000000/google-logo.png"></my-icon> </div>
    <div slot="item2"> <my-icon> <img src="https://img.icons8.com/ios/250/000000/dashboard.png"></my-icon> </div>
    <div slot="item3"><my-icon> <img src="https://img.icons8.com/ios/250/000000/color-palette.png"></my-icon> </div>
   </my-dock>
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