/**
 * Can take in three applications.
 */
const template = document.createElement('template')
template.innerHTML = `
 
  <style>
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
 *
 */
class myAnime extends HTMLElement {
  /**
   *
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
   *
   */
  fetchRandomQoute () {
    fetch('https://animechan.vercel.app/api/random')
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.anime.textContent =`Anime: ${res.anime}`
        this.character.textContent = `Charachter: ${res.character}`
        this.text.textContent = `Quote: ${res.quote}`
      })
  }

  /**
   *
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
