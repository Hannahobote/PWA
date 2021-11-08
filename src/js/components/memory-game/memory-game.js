import { cardTwelve } from '../my-card/cards-database.js'
import '../my-card/my-card.js'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
   
  .board {
    display: grid;
    grid-template-columns: repeat(4, auto);
  }
 
  </style>

  <div class="board"> </div>

  <button > 4x4 </button>
  <button > 4x2 </button>
  <button> 2x2 </button>


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

    this.twoByTwo()

    // Get elemens here 
    // TODO: Maybee you need to define some default values here
  }

  shuffleCards(cardsArr) {
    return cardsArr.sort((a, b) => 0.5 - Math.random());
  }

  addCard(cardsData) {
    cardsData.forEach(data => {
      let card = document.createElement('my-card')
      card.setFrontImg(data.cardFront)
      card.id = data.id
      this.shadowRoot.querySelector('.board').appendChild(card)
      //this.shadowRoot.appendChild(card)

    })
  }

  fourByFour() {
    let cardsData = this.shuffleCards([...cardTwelve])
    this.addCard(cardsData)
  }

  fourByTwo() {
    let eigthCards = cardTwelve.slice(0, 8)
    eigthCards = this.shuffleCards(eigthCards)
    this.addCard(eigthCards)
  }

  twoByTwo() {
    let fourCards = cardTwelve.slice(0, 4)
    fourCards = this.shuffleCards(fourCards)
    this.addCard(fourCards)
  }
  // winner()

  // rule ()

}

window.customElements.define('memory-game', memoryGame);