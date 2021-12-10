// imports all the components. Later on only use this one file and import it to html to get acces to the components ?
import './components/my-window/my-window.js'
// import './components/memory-game/memory-game.js'
import './components/memory-game/memory-game2.js'
import './components/my-dock/my-dock.js'
import './components/my-icon/my-icon.js'
import './components/my-icon/my-icon2.js'

/**
 * Define template.
 */
 const template = document.createElement('template') 
 template.innerHTML = `

 <style>

  my-dock {
  position: fixed;
  bottom: 0;
 }

 img {
   width: 50px;
   height: 50px;
 }
 
 </style>
 
  <!--<my-window>
   <memory-gametwo></memory-gametwo>
  </my-window> -->
  
   <my-dock>

    <div slot="item1">  
      <my-icon2 class="icon1" > 
          <div slot="image">  <img src="https://img.icons8.com/ios/250/000000/google-logo.png"> </div> 
          <div class="app1" slot="app"></div>
      </my-icon2>
      <div class="app12"></div>
    </div>

    <div slot="item2">  
      <my-icon2 class="icon2"> 
          <div slot="image">  <img src="https://img.icons8.com/ios/250/000000/google-logo.png"> </div> 
          <div class="app2" slot="app"></div>
      </my-icon2>
    </div>

    <div slot="item3">  
      <my-icon2 class="icon3"> 
            <div slot="image">  <img src="https://img.icons8.com/ios/250/000000/google-logo.png"> </div> 
            <div class="app3" slot="app"></div>
      </my-icon2>
    </div>

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

   this.iconOne = this.shadowRoot.querySelector('.icon1')
   this.iconTwo = this.shadowRoot.querySelector('.icon2')
   this.iconThree = this.shadowRoot.querySelector('.icon3')
   this.allIconElement= Array.from(this.shadowRoot.querySelectorAll('my-icon2'))
   console.log(this.allIconElement)
  }

  createApp() {
    this.iconElement.createApp('memory-gametwo')
  }
  
  createMemoryApp(){ 
    let window = document.createElement('my-window')
    let memoryApp = document.createElement('memory-gametwo')
    window.appendChild(memoryApp)
    this.shadowRoot.querySelector('.app12').appendChild(window)
  }

  createSubApp1(){ 
    console.log('created!')
  }

  createSubApp2(){ 
    console.log('created!')
  }

  addEventToIcons(){
  }
  
  connectedCallback() {
    this.allIconElement[0].addEventListener('click',() => {
      this.createMemoryApp()
      console.log('click!')
    } )
    /*this.iconOne.addEventListener('click', () => {
      this.createMemoryApp()
      console.log('click!')
    })*/
    
  }

  disconnectedCallback() {
    this.allIconElement.forEach(icon => icon.removeEventListener('click', this.createAppForIcon()))
    
  }


 }

 window.customElements.define('my-app', myApp);