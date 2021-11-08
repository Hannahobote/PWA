/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `

 <style>

 #cardBack {
  height: 100px;
  width: 100px;
  position: absolute;
 }

 #cardFront {
  height: 100px;
  width: 100px;
  visibility: hidden;
  position: relative;
 }
 
 /*.card {
  height: 50px;
  width: 50px;
 }*/

 </style>
 <div class="card">
    <img 
      id="cardBack"
      src="https://thumbs.dreamstime.com/b/playing-card-back-side-isolated-white-clipping-path-included-playing-card-back-side-isolated-white-172500899.jpg"
    >
  <img id="cardFront">
 </div> 
 `

/**
 * Runs the app.
 */
class myCard extends HTMLElement {
  constructor() {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    //this.shadowRoot.querySelector('#cardFront').src = this.getAttribute('cardfront')
    this.cardFront = this.shadowRoot.querySelector('#cardFront')
    this.cardBack = this.shadowRoot.querySelector('#cardBack')

    this.showFront = false;
    // Get elemens here 
    // TODO: Maybee you need to define some default values here
  }

  /**
 * Called when observed attribute(s) changes.
 *
 * @param {string} name - The attribute's name.
 * @param {*} oldValue - The old value.
 * @param {*} newValue - The new value.
 */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'boardsize') {
      return false
    }
  }


  flipCard() {
    // turn card 
    // hide back
    this.showFront = !this.showFront
    if (this.showFront) {
      this.cardFront.style.visibility = 'visible'
      this.cardBack.style.visibility = 'hidden'
    } else {
      this.cardFront.style.visibility = 'hidden'
      this.cardBack.style.visibility = 'visible'
    }
  }

  setFrontImg(src) {
    //this.cardFront.src = src
    this.shadowRoot.querySelector('#cardFront').src = src
  }



  connectedCallback() {
    this.cardBack.addEventListener('click', () => this.flipCard())
    this.cardFront.addEventListener('click', () => this.flipCard())
  }

  disconnectedCallback() {

  }
}

window.customElements.define('my-card', myCard);