/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `

 <style>
 body {
   font-family: Arial, Helvetica, sans-serif;
 }

 .show {
   display:none;
 }

 </style>
  <div class="container"> 

    <div class="image"> 
      <span><slot name="image"/></span> <!--takes in an image! document later!-->
</div>

   <!-- <div class="app"> 
      <div><slot class="app2" name="app"/></div> 
    </div>-->

  </div>
 `

/**
 * Window class can consits of an app that view in the window. i.e when you press the app icon on the dock, a window should pop up.
 */
class myIcon extends HTMLElement {
  /**
   *
   */
  constructor () {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    this.icon = this.shadowRoot.querySelector('.container')
    this.app = this.shadowRoot.querySelector('.app')
    this.app2 = this.shadowRoot.querySelector('.app2')
    this.window = this.app
    this.app.classList.toggle('show')
    console.log(this.app2)
    console.log(this.shadowRoot.querySelector('app'))
  }

  /**
   *
   */
  showApp () {
    this.app.classList.toggle('show')
  }

  /**
   *
   */
  connectedCallback () {
    this.icon.addEventListener('click', () => {
      console.log('click')
      this.showApp()
    })
  }

  /**
   *
   */
  disconnectedCallback () {
    this.icon.removeEventListener('click', () => {
      console.log('click')
      this.showApp()
    })
  }
}

window.customElements.define('my-icon', myIcon)
