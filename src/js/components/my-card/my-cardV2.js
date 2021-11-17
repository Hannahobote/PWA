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
  }
 
  .cardFront {
   height: 100px;
   width: 100px;
   visibility: hidden;
   position: relative;
   /*background-color: red;*/
  }

  .hidden {
    visibility: hidden;
  }

  .show {
    visibility: visible;
  }


  </style>

  <div class="card">
   <div class="cardBack"></div>
   <div class="cardFront"></div>
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
    this.isflipped = false;
    this.setColor()
  }

  connectedCallback() {
    this.cardBack.addEventListener('click', () => {
      this.flip()
      console.log('you clicked me')
    })

    this.cardFront.addEventListener('click', () => {
      this.flip()
      console.log('you clicked me')
    })
  }


  disconnectedCallback() {

  }

  flip() {
    // by default the front is set to hidden, so toggle it too show
    this.cardFront.classList.toggle('show')
    // by default the back is set to visible, so toggle it
    this.cardBack.classList.toggle('hidden')
  }

  setColor() {
    this.shadowRoot.querySelector('.cardFront').style.backgroundColor = this.dataset.color
  }
}

window.customElements.define('my-cardtwo', myCard);