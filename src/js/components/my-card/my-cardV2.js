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
   background-color: #eee;
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
 * Runs the app.
 */
class myCard extends HTMLElement {
  constructor() {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    this.cardFront = this.shadowRoot.querySelector('.cardFront')
    this.cardBack = this.shadowRoot.querySelector('.cardBack')
    this.isflipped = false
    this.setColor()
  }

  connectedCallback() {
    this.cardBack.addEventListener('click', () => {
      this.flip()
      console.log('you clicked me')
      this.cardBack.disabled = true
    })

    this.cardFront.addEventListener('click', () => {
      this.flip()
      this.cardFront.disabled = true
      console.log('you clicked me')
    })
  }


  disconnectedCallback() {
    this.cardBack.removeEventListener('click', () => {
      this.flip()
      console.log('you clicked me')
    })

    this.cardFront.removeEventListener('click', () => {
      this.flip()
      console.log('you clicked me')
    })
  }

  flip() {
    // by default the front is set to hidden, so toggle it too show
    this.cardFront.classList.toggle('show')
    // by default the back is set to visible, so toggle it
    this.cardBack.classList.toggle('hidden')
    this.cardBack.disabled = false
    this.cardFront.disabled = false
  }

  hideCard() {
    this.cardBack.disabled = true
    this.cardFront.disabled = true
    this.cardBack.style.backgroundColor = 'white'
    this.cardFront.style.backgroundColor = 'white'
  }

  setColor() {
    this.shadowRoot.querySelector('.cardFront').style.backgroundColor = this.dataset.color
  }
}

window.customElements.define('my-cardtwo', myCard);