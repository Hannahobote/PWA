/**
 * Define template.
 */
 const template = document.createElement('template') 
 template.innerHTML = `

 <style>
 body {
   font-family: Arial, Helvetica, sans-serif;
 }

 
 #cardBack {
  height: 250px;
  width: 250px;
  background-color: blue;
  position: absolute;
 }

 #cardFront {
  height: 250px;
  width: 250px;
  visibility: hidden;
  position: absolute;
 }
 
 #card {
  height: 50px;
  width: 50px;
 }

 </style>

<h1> my card  </h1>
 <!--<div id="card">
  <img id="cardBack">
  <img id="cardFront">
 </div> -->

 <div id="card">
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
    this.shadowRoot.querySelector('#cardFront').src = this.getAttribute('cardFront')
    this.cardFront = this.shadowRoot.querySelector('#cardFront')
    this.cardBack = this.shadowRoot.querySelector('#cardBack')
    
    this.showFront = false;
    // Get elemens here 
    // TODO: Maybee you need to define some default values here
  }

  flipCard() {
    // turn card 
    // hide back
    this.showFront = !this.showFront
    if(this.showFront) {
      this.cardFront.style.visibility = 'visible'
      this.cardBack.style.visibility = 'hidden'
    } else {
      this.cardFront.style.visibility = 'hidden'
      this.cardBack.style.visibility = 'visible'
    }
  }

  connectedCallback() {
    this.cardBack.addEventListener('click', () => this.flipCard())
    this.cardFront.addEventListener('click', () => this.flipCard())
  }
  
  disconnectedCallback() {

  }
 }

 window.customElements.define('my-card', myCard);