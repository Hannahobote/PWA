/* eslint-disable jsdoc/check-examples */
/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
 
  <style>
 
  .cardBack {
   height: 100px;
   width: 100px;
   position: absolute;
   background-color: #873e23;
   border: 0px solid;

  }
 
  .cardFront {
   height: 100px;
   width: 100px;
   visibility: hidden;
   position: relative;
   border: 0px solid;
  }

  .hidden {
    visibility: hidden;
  }

  .show {
    visibility: visible;
  }


  </style>

  <div class="card">
   <button class="cardBack"></button>
   <button class="cardFront"></button>
  </div> 
  `

/**
 * The card version 2.
 */
class myCard extends HTMLElement {
  /**
   *Constructor.
   */
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    this.cardFront = this.shadowRoot.querySelector('.cardFront')
    this.cardBack = this.shadowRoot.querySelector('.cardBack')
    this.setColor()
  }

  /**
   *Flips card.
   */
  flip () {
    // by default the front is set to hidden, so toggle it too show
    this.cardFront.classList.toggle('show')
    // by default the back is set to visible, so toggle it
    this.cardBack.classList.toggle('hidden')
    this.cardBack.disabled = false
    this.cardFront.disabled = false
  }

  /**
   *Hides the card from DOM by making it white.
   */
  hideCard () {
    this.cardBack.disabled = true
    this.cardFront.disabled = true
    this.cardBack.style.backgroundColor = 'white'
    this.cardFront.style.backgroundColor = 'white'
  }

  /**
   *Sets colot to the dataset.
   */
  setColor () {
    this.shadowRoot.querySelector('.cardFront').style.backgroundColor = this.dataset.color
  }

  /**
   * Adds event when you click the back of the card.
   */
  onClickCardBack () {
    this.cardBack.addEventListener('click', () => {
      this.flip()
      this.cardBack.disabled = true
      console.log('you flipped me')
    })
  }

  /**
   * Adds event when you click the front of the card.
   */
  onclickCardFront () {
    this.cardFront.addEventListener('click', () => {
      this.flip()
      this.cardFront.disabled = true
      console.log('you flipped me')
    })
  }

  /**
   *Adds event.
   */
  connectedCallback () {
    this.onClickCardBack()
    this.onclickCardFront()
  }

  /**
   *Removes event.
   */
  disconnectedCallback () {
    this.onClickCardBack()
    this.onclickCardFront()
  }
}

window.customElements.define('my-cardtwo', myCard)
