import '../my-card/my-cardV2.js'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .board {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, auto);
  }

  .hidden {
    visibility: hidden;
  }

  .show {
    visibility: visible;
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
      .appendChild(template.content.cloneNode(true))

    this.colorData = ['red', 'red', 'blue', 'blue', 'pink', 'pink', 'purple', 'purple', 'green', 'green', 'yellow', 'yellow'] // change to pastel colors :)
    this.fourByFourBtn = this.shadowRoot.querySelector('#four')
    this.fourByTwoBtn = this.shadowRoot.querySelector('#fourTwo')
    this.twoByTwoBtn = this.shadowRoot.querySelector('#two')
    this.clickedCard = []
  }

  shuffleColorData(colorData) {
    return colorData.sort((a, b) => 0.5 - Math.random());
  }

  createCards(data) {
    data.forEach(data => {
      let card = document.createElement('my-cardtwo')
      card.dataset.color = data
      card.setColor()
      // console.log(card.dataset.color, 'dataset') //  for error handeling.
      this.shadowRoot.querySelector('.board').appendChild(card)
    })
  }

  createFourByFourCards() {
    let cards = this.shuffleColorData(this.colorData)
    this.createCards(cards)
  }

  createFourByTwoCards() {
    let cards = this.colorData.slice(0, 8)
    cards = this.shuffleColorData(cards)
    this.createCards(cards)
  }

  createTwoByTwoCards() {
    let cards = this.colorData.slice(0, 4)
    cards = this.shuffleColorData(cards)
    this.createCards(cards)
  }

  hideButtons() {
    this.fourByFourBtn.classList.toggle('hidden')
    this.fourByTwoBtn.classList.toggle('hidden')
    this.twoByTwoBtn.classList.toggle('hidden')
  }

  isMatch(e) {
    this.clickedCard.push(e.target.dataset.color)
    // check if there are 2 clicked cards.
    if(this.clickedCard.length == 2) {
      // check if cards match 
      if(this.clickedCard[0] == this.clickedCard[1]){
        console.log('its a match')
        // make matched cards white 
        console.log()
        this.clickedCard[0] = 'white'
        this.clickedCard[1]= 'white'
        // reset array
        this.clickedCard.length = 0 
      } else {
        console.log('not a macth')
        // set timer and flip back card 
        // reset array
        this.clickedCard.length = 0

      }
    }
  }

  addEventToCards() {
    let myCardEl = Array.from(this.shadowRoot.querySelectorAll('my-cardtwo'))
    // add event listener to every card in DOM
    myCardEl.forEach(card => {
      card.addEventListener('click', e => {
        // check if its a match
        this.isMatch(e)
      })
    })
    console.log(myCardEl)
  }

  isNotMatch() {

  }

  flipCardBack() {
    // set interval timer
  }


  connectedCallback() {
    this.fourByFourBtn.addEventListener('click', () => {
      this.createFourByFourCards()
      this.hideButtons()
      this.addEventToCards()
     
    })

    this.fourByTwoBtn.addEventListener('click', () => {
      this.createTwoByTwoCards()
      this.hideButtons()
    })

    this.twoByTwoBtn.addEventListener('click', () => {
      this.createTwoByTwoCards()
      this.hideButtons()
    })
  }


  disconnectedCallback() {

  }



}

window.customElements.define('memory-gametwo', memoryGame);