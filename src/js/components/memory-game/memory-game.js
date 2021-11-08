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

  <button id="four" > 4x4 </button>
  <button id="fourTwo" > 4x2 </button>
  <button id="two"> 2x2 </button>


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

      this.fourBtn = this.shadowRoot.querySelector('#four')
      this.fourTwoBtn = this.shadowRoot.querySelector('#fourTwo')
      this.twoBtn = this.shadowRoot.querySelector('#two')
    // Get elemens here 
    // TODO: Maybee you need to define some default values here
  }

  
  connectedCallback() {
    this.fourBtn.addEventListener('click', () => this.fourByFour())
    this.fourTwoBtn.addEventListener('click', () => this.fourByTwo())
    this.twoBtn.addEventListener('click', () => this.twoByTwo() )
  }

  
  disconnectedCallback() {
    this.fourBtn.removeEventListener('click', () => this.fourByFour())
    this.fourTwoBtn.removeEventListener('click', () => this.fourByTwo())
    this.twoBtn.removeEventListener('click', () => this.twoByTwo() )
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
    })
  }


  fourByFour() {
    let cardsData = this.shuffleCards([...cardTwelve])
    this.addCard(cardsData)
    this.removeBtn()
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

  /**
   * Remove buttons from screen if layout is chosen.
   */
  removeBtn() {
    this.fourBtn.remove()
    this.fourTwoBtn.remove()
    this.twoBtn.remove()
  }
  // winner()

  // rule () // get the card on the bourd and match the id to each other.

}

window.customElements.define('memory-game', memoryGame);