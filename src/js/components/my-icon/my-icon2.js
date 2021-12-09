import '../my-window/my-window.js'
import '../memory-game/memory-game2.js'

/**
 * Define template.
 */
 const template = document.createElement('template')
 template.innerHTML = `

 <style>
 body {
   font-family: Arial, Helvetica, sans-serif;
 }

 .show {
   display:none;
 }

 </style>
  <div class="container"> 

    <div class="image"> 
      <div><slot name="image"/></div> <!--takes in an image! document later!-->
    </div>

    <div class="app"> 
    
    </div>

  </div>
 `

 /**
  * Window class can consits of an app that view in the window. i.e when you press the app icon on the dock, a window should pop up.
  */
 class myIcon2 extends HTMLElement {
  constructor() {
    super()
    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

    this.icon=this.shadowRoot.querySelector('.container')
    //this.shadowRoot.querySelector('.app').style.display='none'
  }

  
  createApp(appName) {
    let app = document.createElement(`${appName}`)
    let window = document.createElement('my-window')
    window.appendChild(app)
    this.shadowRoot.querySelector('.app').appendChild(window)
    console.log('created')
  }

  connectedCallback() {
    this.icon.addEventListener('click', this.createApp())
  }

  disconnectedCallback() {
    this.icon.removeEventListener('click', this.createApp())
  }

 }

 window.customElements.define('my-icon2', myIcon2);