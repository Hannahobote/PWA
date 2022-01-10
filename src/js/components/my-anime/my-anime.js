/* eslint-disable jsdoc/check-examples */
const template = document.createElement('template')
template.innerHTML = `
 
  <style>
      button, input {
    background-color: #eee;
    text-decoration: none;
    border-radius: 25px;
    border: none;
    padding: 10px;
    margin: none;
  }

  </style>

   <div class="container">
    <span class="anime"> </span>
    </br>
    <span class="char"> </span>
    </br>
    <span class="quote"> </span>
    </br>
    <button class="new-btn"> New qoute </button>
  </div>
  
  `

/**
 * Radom anime quote generater app.
 */
class myAnime extends HTMLElement {
  /**
   *Constructor.
   */
  constructor () {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    /**
     * The entire window element
     */
    this.anime = this.shadowRoot.querySelector('.anime')
    this.character = this.shadowRoot.querySelector('.char')
    this.text = this.shadowRoot.querySelector('.quote')
    this.btn = this.shadowRoot.querySelector('.new-btn')

    this.fetchRandomQoute()
  }

  /**
   *Fetch random quote from api.
   */
  fetchRandomQoute () {
    fetch('https://animechan.vercel.app/api/random')
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.anime.textContent = `Anime: ${res.anime}`
        this.character.textContent = `Charachter: ${res.character}`
        this.text.textContent = `Quote: ${res.quote}`
      })
  }

  /**
   *Add events.
   */
  connectedCallback () {
    this.btn.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    this.btn.addEventListener('click', (event) => {
      console.log('masaka!')
      this.fetchRandomQoute()
    })
  }
}

window.customElements.define('my-anime', myAnime)
