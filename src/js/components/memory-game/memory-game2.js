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
<h3> attemps:  <span id="attempts"> </span></h3> 
<h3> timer:  <span id="time-left"> </span></h3> 
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
      .appendChild(template.content.cloneNode(true))

    this.colorData = ['blue', 'blue', 'green', 'green', 'yellow', 'yellow', 'purple', 'purple', 'orange', 'orange', 'red', 'red', 'pink', 'pink', 'black', 'black']
    this.fourByFourBtn = this.shadowRoot.querySelector('#four')
    this.fourByTwoBtn = this.shadowRoot.querySelector('#fourTwo')
    this.twoByTwoBtn = this.shadowRoot.querySelector('#two')
    // Contains the colors of the clicked cards.
    this.clickedCard = []
    // Holds the card element with its methods.
    this.clickedCardElement = []
    // if playes do NOT match, increse counter
    this.playerAttempts = 0
    this.playerAttemptsElement = this.shadowRoot.querySelector('#attempts')
    this._timeDisplay = this.shadowRoot.querySelector('#time-left')
    this._timeLeft = 0
    this._defaultTime = 20
    this._timer = 20
    this._totalTimeScore = 0
  }

  /**
   * @param colorData
   */
  shuffleColorData (colorData) {
    return colorData.sort((a, b) => 0.5 - Math.random())
  }

  /**
   * @param data
   */
  createCards (data) {
    data.forEach(data => {
      const card = document.createElement('my-cardtwo')
      card.dataset.color = data
      card.setColor()
      // console.log(card.dataset.color, 'dataset') //  for error handeling.
      this.shadowRoot.querySelector('.board').appendChild(card)
    })
  }

  /**
   *
   */
  createFourByFourCards () {
    const cards = this.shuffleColorData(this.colorData)
    this.createCards(cards)
  }

  /**
   *
   */
  createFourByTwoCards () {
    let cards = this.colorData.slice(0, 8)
    cards = this.shuffleColorData(cards)
    this.createCards(cards)
  }

  /**
   *
   */
  createTwoByTwoCards () {
    let cards = this.colorData.slice(0, 4)
    cards = this.shuffleColorData(cards)
    this.createCards(cards)
  }

  /**
   *
   */
  hideButtons () {
    this.fourByFourBtn.classList.toggle('hidden')
    this.fourByTwoBtn.classList.toggle('hidden')
    this.twoByTwoBtn.classList.toggle('hidden')
  }

  /**
   * @param e
   */
  isMatch (e) {
    this.clickedCard.push(e.target.dataset.color)
    this.clickedCardElement.push(e.target)
    // bug: if you click a card twice, it will match with itself
    // check if there are 2 clicked cards.
    if (this.clickedCard.length === 2) {
      // check if cards match
      // card should not match wiht itself, so id should NOT be mathing
      if (this.clickedCard[0] === this.clickedCard[1] && this.clickedCardElement[0].id !== this.clickedCardElement[1].id) {
        setTimeout(() => {
          console.log('its a match')
          console.log(this.clickedCardElement[0].id, this.clickedCardElement[1].id)
          // make matched cards white
          this.clickedCardElement[0].hideCard()
          this.clickedCardElement[1].hideCard()
          // check them as matched
          // console.log(this.clickedCardElement[0], this.clickedCardElement[1])
          this.clickedCardElement[0].classList.add('matched')
          this.clickedCardElement[1].classList.add('matched')
          // reset array
          this.clickedCard.length = 0
          this.clickedCardElement.length = 0
          this.winner()
        }, 500)
      } else {
        console.log(this.clickedCardElement[0].id, this.clickedCardElement[1].id)
        this.playerAttempts++
        this.playerAttemptsElement.innerHTML = this.playerAttempts
        // set timer and flip back card
        // set cusoem event, that the card should litsen to, then flip back on its own
        setTimeout(() => {
          this.clickedCardElement[0].flip()
          this.clickedCardElement[1].flip()
          this.clickedCard.length = 0
          this.clickedCardElement.length = 0
        }, 500)
      }
    }
  }

  /**
   *
   */
  addEventToCards () {
    const myCardEl = Array.from(this.shadowRoot.querySelectorAll('my-cardtwo'))
    // add event listener to every card in DOM + add id
    let i = 0
    myCardEl.forEach(card => {
      // add id
      card.id = i
      // add event
      card.addEventListener('click', e => {
        // check if its a match
        this.isMatch(e)
      })
      i++
    })
    console.log(myCardEl)
  }

  /**
   * If all cards are matched, play again
   */
  winner () {
    if (this.allCardsMatched()) {
      this.resetGame()
    }
  }

  /**
   *
   */
  allCardsMatched () {
    const myCardEl = Array.from(this.shadowRoot.querySelectorAll('my-cardtwo'))
    const isMatched = myCardEl.every(card => card.classList.contains('matched'))
    console.log('all cards are matched: ', isMatched)
    return isMatched
  }

  /**
   *
   */
  resetGame () {
    // remove all cards fom DOM
    const cards = this.shadowRoot.querySelectorAll('my-cardtwo')
    console.log(cards)
    cards.forEach(card => {
      card.remove()
    })
    this.stopTimer()
    alert(`You won with ${this.playerAttempts} attempts, and it took you ${this._timeLeft} seconds to complete the game. Press 'OK'to play again`)
    this.resetTimer()
    // show buttons
    this.hideButtons()
    this.playerAttemptsElement.innerHTML = 0
    this.playerAttempts = 0
    console.log('reset game')
  }

  /**
   * Start timer. Copied code from my quiz application.
   */
  startTimer () {
    this._timer = setInterval(() => {
      this._timeLeft += 1
      this._timeDisplay.textContent = this._timeLeft

      if (this._timeLeft <= 0) {
        this.resetTimer()
        //  this.dispatchEvent(new window.CustomEvent('timeout', { detail: { timeout: true } }))
      }
    }, 1000)
  }

  /**
   * Stop timer. Copied code from my quiz application.
   */
  stopTimer () {
    clearInterval(this._timer)
  }

  /**
   * Reset timer. Copied code from my quiz application.
   */
  resetTimer () {
    clearInterval(this._timer)
    this._timeLeft = 0
    this._timeDisplay.textContent = this._timeLeft
  }

  /**
   * Adds event.
   */
  connectedCallback () {
    this.fourByFourBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.createFourByFourCards()
      this.hideButtons()
      this.addEventToCards()
      this.startTimer()
    })

    this.fourByTwoBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.createFourByTwoCards()
      this.hideButtons()
      this.addEventToCards()
      this.startTimer()
    })

    this.twoByTwoBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.createTwoByTwoCards()
      this.hideButtons()
      this.addEventToCards()
      this.startTimer()
    })
  }

  /**
   * Removes event.
   */
  disconnectedCallback () {
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

window.customElements.define('memory-gametwo', memoryGame)
