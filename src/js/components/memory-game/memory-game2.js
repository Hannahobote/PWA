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
    this.clickedCardEl = []
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
    this.clickedCardEl.push(e.target)
    
    // check if there are 2 clicked cards.
    if(this.clickedCard.length == 2) {
      // check if cards match 
      if(this.clickedCard[0] == this.clickedCard[1]){
        console.log('its a match')
        // make matched cards white 
         //this.clickedCardEl[0].classList.add('hidden') 
         //this.clickedCardEl[1].classList.add('hidden')
        this.clickedCardEl[0].remove()
        this.clickedCardEl[1].remove()
        // reset array
        this.clickedCard.length = 0 
        this.clickedCardEl.length = 0
      } else {
        console.log('not a macth')
        // set timer and flip back card 
        // set cusoem event, that the card should litsen to, then flip back on its own
        setTimeout(() =>{
          this.dispatchEvent(new window.CustomEvent('notMatch', { detail: { match: true } }))
         // this.clickedCardEl[0]
         // this.clickedCardEl[1]
          this.clickedCard.length = 0
          this.clickedCardEl.length = 0
        }, 500)

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

  winner() {

  }

  flipCardBack(card1, card2) {
    console.log(card1,card2)
    card1.toggleCardFront()
    card2.toggleCardBack()
  }

  removeCardsOnMatch(card1, card2) {
    card1.style.visibility = 'hidden'
    card2.style.visibility = 'hidden'
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
      this.addEventToCards()
    })

    this.twoByTwoBtn.addEventListener('click', () => {
      this.createTwoByTwoCards()
      this.hideButtons()
      this.addEventToCards()
    })
  }


  disconnectedCallback() {

  }



}

window.customElements.define('memory-gametwo', memoryGame);