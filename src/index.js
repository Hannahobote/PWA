/* eslint-disable jsdoc/check-examples */
import './js/components/my-window/my-window.js'
import './js/components/memory-game/memory-game2.js'
import './js/components/my-dock/my-dock.js'
import './js/components/my-icon/my-icon2.js'
import './js/components/my-chat/my-chat.js'
import './js/components/my-anime/my-anime'

const template = document.createElement('template')
template.innerHTML = `

 <style>
  my-dock {
  position: absolute;
  top: 0;
 }

 img {
   width: 50px;
   height: 50px;
 }
 
 </style>

   <my-dock>

    <div slot="item1">  
      <my-icon2 class="icon1" > 
          <div slot="image">  <img src="https://img.icons8.com/ios/250/000000/star.png"> </div> 
      </my-icon2>
      <div id="app1"></div>
    </div>

    <div slot="item2">  
      <my-icon2 class="icon2"> 
          <div slot="image">  <img src="https://img.icons8.com/ios/250/000000/speech-bubble.png"> </div> 
      </my-icon2>
      <div id="app2"></div>
    </div>

    <div slot="item3">  
      <my-icon2 class="icon3"> 
            <div slot="image">  <img src="https://img.icons8.com/ios/250/000000/home.png"> </div> 
      </my-icon2>
      <div id="app3"></div>
    </div>

   </my-dock>
 `

/**
 * Runs the app.
 */
class myApp extends HTMLElement {
  /**
   *Constructor.
   */
  constructor () {
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
  }

  /**
   *Creates an intance of the memory app.
   */
  createMemoryApp () {
    const window = document.createElement('my-window')
    const memoryApp = document.createElement('memory-gametwo')
    window.appendChild(memoryApp)
    this.shadowRoot.querySelector('#app1').appendChild(window)
  }

  /**
   *Creates an intance of the chat app.
   */
  createChatApp () {
    const window = document.createElement('my-window')
    const chatApp = document.createElement('my-chat')
    window.appendChild(chatApp)
    this.shadowRoot.querySelector('#app2').appendChild(window)
  }

  /**
   *Creates an intance of the anime app.
   */
  createAnimeApp () {
    const window = document.createElement('my-window')
    const animeApp = document.createElement('my-anime')
    window.appendChild(animeApp)
    this.shadowRoot.querySelector('#app3').appendChild(window)
  }

  /**
   * The app events.
   */
  events () {
    this.iconOne.addEventListener('click', () => {
      this.createMemoryApp()
    })
    this.iconTwo.addEventListener('click', () => {
      this.createChatApp()
    })
    this.iconThree.addEventListener('click', () => {
      this.createAnimeApp()
    })
  }

  /**
   *Adds event.
   */
  connectedCallback () {
    this.events()
  }

  /**
   *Removes events.
   */
  disconnectedCallback () {
    this.events()
  }
}

window.customElements.define('my-app', myApp)
