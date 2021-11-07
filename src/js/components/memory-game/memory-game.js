import { cardTwelve } from '../my-card/cards-database.js'
import '../my-card/my-card.js'

/**
 * Define template.
 */
 const template = document.createElement('template') 
 template.innerHTML = `
  <style>
  
 my-card {
   float: left;
 }
  </style>
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
    this.fourByFour()
    //this.fourByFour()
    
    this.allCardEl = this.shadowRoot.querySelectorAll('my-card')
    console.log(this.allCardEl)

    // Get elemens here 
    // TODO: Maybee you need to define some default values here
  }

  shuffleCards(cardsArr){
    return cardsArr.sort((a, b) => 0.5 - Math.random());
  }

  fourbyfourCards () {
    return this.shuffleCards(cardTwelve)
  }

  fourByFour() {
    let cardsData = this.fourbyfourCards()
    cardsData.forEach(data => {
        let card = document.createElement('my-card')
        this.shadowRoot.appendChild( card )
        card.setFrontImg(data.cardFront)
        card.id = data.id
        console.log(data.id)
    })
  }

  // winner()

  // rule ()

  fourByTwo () {
    // cut array till its only 8 elements left 
    // repead what you did in fourByfour
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