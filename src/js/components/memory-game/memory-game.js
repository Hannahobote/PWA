import { cardTwelve } from '../my-card/cards-database.js'
import '../my-card/my-card.js'
import '../my-card/my-cardV2.js'

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

  .match {
  background-image: url("bgdesert.jpg");
  height: 100px;
  width: 100px;
  }

  .red {
    background-color: red;
  }

  [data-color=purple] {
    background-color:purple 
  }
 
  </style>
  <my-cardtwo data-color="purple"> </my-cardtwo>
  <div class="board"> </div>

  <button id="four" > 4x4 </button>
  <button id="fourTwo" > 4x2 </button>
  <button id="two"> 2x2 </button>


 `

/**
 * Runs the app.
 */
class memoryGame extends HTMLElement {
  /**
   *
   */
  constructor () {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true)) // viktigt !!!!.

    this.fourBtn = this.shadowRoot.querySelector('#four')
    this.fourTwoBtn = this.shadowRoot.querySelector('#fourTwo')
    this.twoBtn = this.shadowRoot.querySelector('#two')
    this.cardFront = this.shadowRoot.querySelector('my-cardtwo')
    console.log(this.cardFront)
  }

  /**
   *
   */
  connectedCallback () {
    this.fourBtn.addEventListener('click', () => this.fourByFour())
    this.fourTwoBtn.addEventListener('click', () => {
      this.fourByTwo()
      this.eventOnCard(this.getAllCards())
    })
    this.twoBtn.addEventListener('click', () => this.twoByTwo())
    // this.allCards.addEventListener('click', this.match())
  }

  /**
   *
   */
  disconnectedCallback () {
    this.fourBtn.removeEventListener('click', () => this.fourByFour())
    this.fourTwoBtn.removeEventListener('click', () => this.fourByTwo())
    this.twoBtn.removeEventListener('click', () => this.twoByTwo())
  }

  /**
   * @param cardsArr
   */
  shuffleCards (cardsArr) {
    return cardsArr.sort((a, b) => 0.5 - Math.random())
  }

  /**
   * @param cardsData
   */
  addCard (cardsData) {
    cardsData.forEach(data => {
      const card = document.createElement('my-card')
      card.setFrontImg(data.cardFront)
      card.id = data.id
      this.shadowRoot.querySelector('.board').appendChild(card)
    })
  }

  /**
   *
   */
  fourByFour () {
    const cardsData = this.shuffleCards([...cardTwelve])
    this.addCard(cardsData)
    this.removeBtn()
  }

  /**
   *
   */
  fourByTwo () {
    let eigthCards = cardTwelve.slice(0, 8)
    eigthCards = this.shuffleCards(eigthCards)
    this.addCard(eigthCards)
    this.removeBtn()
  }

  /**
   *
   */
  twoByTwo () {
    let fourCards = cardTwelve.slice(0, 4)
    fourCards = this.shuffleCards(fourCards)
    this.addCard(fourCards)
    this.removeBtn()
  }

  /**
   * Remove buttons from screen if layout is chosen.
   */
  removeBtn () {
    this.fourBtn.remove()
    this.fourTwoBtn.remove()
    this.twoBtn.remove()
  }

  /**
   *
   */
  getAllCards () {
    const allCards = this.shadowRoot.querySelectorAll('my-card')
    const arrayCards = Array.from(allCards)
    return arrayCards
  }

  /**
   * @param cards
   */
  eventOnCard (cards) {
    const result = []
    cards.forEach(card => {
      card.addEventListener('cardClicked', evt => {
        console.log(evt.detail)
      })
      card.addEventListener('click', evt => {
        result.push(evt.target.id)
        console.log(result)
        this.match(result)
        console.log(evt.target.id)
      })
    })
  }
  // winner()

  // rule () // get the card on the bourd and match the id to each other.

  // match() if match, remove (make pic white) from board, else flip cards back.
  /**
   * @param cardsToMatch
   */
  match (cardsToMatch) {
    if (cardsToMatch.length < 2) {
      console.log('no cards to match')
    }
    if (cardsToMatch.length === 2) {
      if (cardsToMatch.every((val, i, arr) => val === arr[0])) {
        console.log('a match')
        cardsToMatch.length = 0
        console.log(cardsToMatch)
      } else {
        console.log('not a match')
        cardsToMatch.length = 0
        console.log(cardsToMatch)
      }
    }
  }

  // click on card
  // its a macth, turn card white
}

window.customElements.define('memory-game', memoryGame)
