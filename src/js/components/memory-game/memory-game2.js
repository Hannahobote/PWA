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
 
  </style>

  <div class="board"> </div>

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
      //this.createCards()
      this.createFourByFourCards()
      this.createFourByTwoCards()
      this.createTwoByTwoCards()

  }
  
  shuffleColorData (colorData) {
    return colorData.sort((a, b) => 0.5 - Math.random());
  }

  createCards (data) {
    data.forEach(data => {
      let card = document.createElement('my-cardtwo')
      card.dataset.color = data
      card.setColor()
      // console.log(card.dataset.color, 'dataset') //  for error handeling.
      this.shadowRoot.querySelector('.board').appendChild(card)
    })
  }

  createFourByFourCards () {
    let cards = this.shuffleColorData(this.colorData)
    this.createCards(cards)
  }

  createFourByTwoCards () {
    let cards = this.colorData.slice(0,8)
    cards = this.shuffleColorData(cards)
    this.createCards(cards)
  }

  createTwoByTwoCards () {
    let cards = this.colorData.slice(0,4)
    cards = this.shuffleColorData(cards)
    this.createCards(cards)
  }


  connectedCallback() {
   
  }


  disconnectedCallback() {
   
  }

 

}

window.customElements.define('memory-gametwo', memoryGame);