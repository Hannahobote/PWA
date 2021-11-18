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

    this.colorData = ['#FFDFCC', '#FFDFCC', '#C3EEFA', '#C3EEFA', '#0771B8', '#0771B8', '#D8D4FF', '#D8D4FF', ' #D4FFDC', ' #D4FFDC', '#FFFED4', '#FFFED4']
    this.fourByFourBtn = this.shadowRoot.querySelector('#four')
    this.fourByTwoBtn = this.shadowRoot.querySelector('#fourTwo')
    this.twoByTwoBtn = this.shadowRoot.querySelector('#two')
    this.clickedCard = []
    /**
    * Holds the card element woth its methods.
    */
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
    //bug: if you click a card twice, it will match with itself
    // check if there are 2 clicked cards.
    if (this.clickedCard.length == 2) {
      // check if cards match 
      // card should not match wiht itself, so id should NOT be mathing
      if (this.clickedCard[0] == this.clickedCard[1] && this.clickedCardEl[0].id !== this.clickedCardEl[1].id ) {
        setTimeout(() => {
          console.log('its a match')
          console.log(this.clickedCardEl[0].id, this.clickedCardEl[1].id)
          // make matched cards white 
          this.clickedCardEl[0].hideCard()
          this.clickedCardEl[1].hideCard()
          // reset array
          this.clickedCard.length = 0
          this.clickedCardEl.length = 0
          
        }, 500)
      } else {
        console.log(this.clickedCardEl[0].id, this.clickedCardEl[1].id)
        // set timer and flip back card 
        // set cusoem event, that the card should litsen to, then flip back on its own
        setTimeout(() => {
          this.clickedCardEl[0].flip()
          this.clickedCardEl[1].flip()
          this.clickedCard.length = 0
          this.clickedCardEl.length = 0
        }, 500)

      }
    }
  }

  addEventToCards() {
    let myCardEl = Array.from(this.shadowRoot.querySelectorAll('my-cardtwo'))
    // add event listener to every card in DOM + add id
    let i = 0;
    myCardEl.forEach(card => {
      // add id
      card.id= i;
      // add event
      card.addEventListener('click', e => {
        // check if its a match
        this.isMatch(e)
      })
      i++
    })
    console.log(myCardEl)
  }

  winner() {

  }

  connectedCallback() {
    this.fourByFourBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.createFourByFourCards()
      this.hideButtons()
      this.addEventToCards()

    })

    this.fourByTwoBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.createFourByTwoCards()
      this.hideButtons()
      this.addEventToCards()
    })

    this.twoByTwoBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.createTwoByTwoCards()
      this.hideButtons()
      this.addEventToCards()
    })
  }


  disconnectedCallback() {
    this.fourByFourBtn.removeEventListener('click', (e) => {
      e.preventDefault()
      this.createFourByFourCards()
      this.hideButtons()
      this.addEventToCards()

    })

    this.fourByTwoBtn.removeEventListener('click', (e) => {
      e.preventDefault()
      this.createFourByTwoCards()
      this.hideButtons()
      this.addEventToCards()
    })

    this.twoByTwoBtn.removeEventListener('click', (e) => {
      e.preventDefault()
      this.createTwoByTwoCards()
      this.hideButtons()
      this.addEventToCards()
    })
  }



}

window.customElements.define('memory-gametwo', memoryGame);