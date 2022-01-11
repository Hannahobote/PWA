/* eslint-disable jsdoc/check-examples */
import '../my-card/my-cardV2.js'

const template = document.createElement('template')
template.innerHTML = `
  <style>

button, input {
    background-color: #eee;
    text-decoration: none;
    border-radius: 25px;
    border: none;
    padding: 10px;
    margine: none;
  }


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
 * Memory game.
 */
class memoryGame extends HTMLElement {
  /**
   *Construtor.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

    /**
     * colords for the memory card.
     */
    this.colorData = ['blue', 'blue', 'green', 'green', 'yellow', 'yellow', 'purple', 'purple', 'orange', 'orange', 'red', 'red', '#d4c7d2', '#d4c7d2', 'black', 'black']
    this.fourByFourBtn = this.shadowRoot.querySelector('#four')
    this.fourByTwoBtn = this.shadowRoot.querySelector('#fourTwo')
    this.twoByTwoBtn = this.shadowRoot.querySelector('#two')
    /**
     *Contains the colors of the clicked cards.
     */
    this.clickedCard = []
    /**
     * Contains the card element with its methods.
     */
    this.clickedCardElement = []
    /**
     * If playes do NOT match, increse counter.
     */
    this.playerAttempts = 0
    this.playerAttemptsElement = this.shadowRoot.querySelector('#attempts')
    this._timeDisplay = this.shadowRoot.querySelector('#time-left')
    this._timeLeft = 0
    this._defaultTime = 20
    this._timer = 20
    this._totalTimeScore = 0
  }

  /**
   * Shuffles color array.
   *
   * @param {string[]} colorData colors for the cars.
   * @returns {string[]} Shuffled colors.
   */
  shuffleColorData (colorData) {
    return colorData.sort((a, b) => 0.5 - Math.random())
  }

  /**
   * Template to create cards from.
   *
   * @param {string[]} data shuffled colors.
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
   * Returns all my-cardtwo elements available in the DOM
   *
   * @returns {HTMLElement[]} all cards
   */
  allCardElements () {
    return Array.from(this.shadowRoot.querySelectorAll('my-cardtwo'))
  }

  /**
   * Adds ID to card elemet.
   *
   * @param {my-cardtwo} cardElement the card eement.
   */
  addIdToCard (cardElement) {
    let i = 0
    cardElement.forEach(card => {
      card.id = i
      i++
    })
  }

  /**
   * Creates 4x4 layout for cards.
   */
  createFourByFourCards () {
    const cards = this.colorData
    const shuffledCards = this.shuffleColorData(cards)
    this.createCards(shuffledCards)
  }

  /**
   * Creates 4x2 layout for cards.
   */
  createFourByTwoCards () {
    const cards = this.colorData.slice(0, 8)
    const shuffledCards = this.shuffleColorData(cards)
    this.createCards(shuffledCards)
  }

  /**
   *Creates 2x2 layout for cards.
   */
  createTwoByTwoCards () {
    const cards = this.colorData.slice(0, 4)
    const shuffledCards = this.shuffleColorData(cards)
    this.createCards(shuffledCards)
  }

  /**
   * Hides buttons from shadow DOM.
   */
  toggleBtn () {
    this.fourByFourBtn.classList.toggle('hidden')
    this.fourByTwoBtn.classList.toggle('hidden')
    this.twoByTwoBtn.classList.toggle('hidden')
  }

  /**
   * Checks if the clicked cards is a match or not.
   *
   * @param {object} e event.
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
   *Adds event to cards.
   */
  addEventToCards () {
    const myCardEl = this.allCardElements()
    this.addIdToCard(myCardEl)
    // add event listener to every card in DOM + add id
    myCardEl.forEach(card => {
      card.addEventListener('click', e => {
        // check if its a match
        this.isMatch(e)
      })
    })
    console.log(myCardEl)
  }


  /**
   * If all cards are matched, play again.
   */
  winner () {
    if (this.allCardsMatched()) {
      this.resetGame()
    }
  }

  /**
   * Checks if all cards are matched, to notifiy that game has ended.
   *
   *@returns {boolean} true if all cards are matches, else false.
   */
  allCardsMatched () {
    const myCardEl = Array.from(this.shadowRoot.querySelectorAll('my-cardtwo'))
    const isMatched = myCardEl.every(card => card.classList.contains('matched'))
    console.log('all cards are matched: ', isMatched)
    return isMatched
  }


    /**
   *Checks if the chosen 2 cards are a match.
   */
     isCardMatch () {
      const myCardEl = this.allCardElements()
      myCardEl.forEach(card => {
        card.addEventListener('click', e => {
          // check if its a match
          this.isMatch(e)
        })
      }
      )
    }

  /**
   * Resets state of Game.
   */
  resetGame () {
    // remove all cards fom DOM
    const cards = this.shadowRoot.querySelectorAll('my-cardtwo')
    cards.forEach(card => card.remove())
    this.stopTimer()
    alert(`You won with ${this.playerAttempts} attempts, and it took you ${this._timeLeft} seconds to complete the game. Press 'OK'to play again`)
    this.resetTimer()
    // show buttons
    this.toggleBtn()
    this.playerAttemptsElement.textContent = 0
    this.playerAttempts = 0
    // console.log('reset game')
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
      this.toggleBtn()
      this.createFourByFourCards()
      this.addIdToCard(this.allCardElements())
      this.isCardMatch()
      this.startTimer()
    })

    this.fourByTwoBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.toggleBtn()
      this.createFourByTwoCards()
      this.addIdToCard(this.allCardElements())
      this.isCardMatch()
      this.startTimer()
    })

    this.twoByTwoBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.toggleBtn()
      this.createTwoByTwoCards()
      this.addIdToCard(this.allCardElements())
      this.isCardMatch()
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
      this.toggleBtn()
      this.addEventToCards()
    })

    this.fourByTwoBtn.removeEventListener('click', (e) => {
      e.preventDefault()
      this.createFourByTwoCards()
      this.toggleBtn()
      this.addEventToCards()
    })

    this.twoByTwoBtn.removeEventListener('click', (e) => {
      e.preventDefault()
      this.createTwoByTwoCards()
      this.toggleBtn()
      this.addEventToCards()
    })
  }
}

window.customElements.define('memory-gametwo', memoryGame)
