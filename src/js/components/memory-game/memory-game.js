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
    //this.addCard()
    this.fourByFour()
    
    this.allCardEl = this.shadowRoot.querySelectorAll('my-card')
    console.log(this.allCardEl)

    // Get elemens here 
    // TODO: Maybee you need to define some default values here
  }

  fourByFour() {
    for(let i=0; i < 12; i++) {
      let card = document.createElement('my-card')
      this.shadowRoot.appendChild( card )
      cardsdb.forEach(dbItem => {
        card.setFrontImg(dbItem.cardFront)
      })
    }
  }

  fourByTwo () {
    for(let i=0; i < 8; i++) {
      let card = document.createElement('my-card')
      this.shadowRoot.appendChild( card )
    }
  }

  twoByTwo () {
    for(let i=0; i < 4; i++) {
      let card = document.createElement('my-card')
      this.shadowRoot.appendChild( card )
    }
  }


  addCard() {
    cardsdb.forEach(db => {
      let card = document.createElement('my-card')
      card.src = card.getAttribute('cardFront')
      let img = document.createElement('img')
      img.src = db.cardFront
      img.id = db.id
      card.shadowRoot.appendChild(img)
      this.shadowRoot.appendChild( card )
    })
  }
 }

 window.customElements.define('memory-game', memoryGame);