import { cardsdb } from '../my-card/cards-database.js'
import '../my-card/my-card.js'

/**
 * Define template.
 */
 const template = document.createElement('template') 
 template.innerHTML = `
 
 
 `

 /**
  * Runs the app.
  */
 class memoryGame extends HTMLElement {
  constructor() {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true)) // viktigt !!!!.

    this.addAllCards()
    // Get elemens here 
    // TODO: Maybee you need to define some default values here
  }

  

  addAllCards () {
    cardsdb.forEach(img => {
      let card = document.createElement('my-card')
      card.setAttribute('cardFront', img.cardFront)
      card.set
      this.shadowRoot.appendChild( card )
    })
  }
 }

 window.customElements.define('memory-game', memoryGame);