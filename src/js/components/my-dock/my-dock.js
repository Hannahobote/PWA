/* eslint-disable jsdoc/check-examples */
/**
 * Can take in three applications.
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

 .dock {
   background-color:#abdbe3;
   width: 1500px;
   height:75px;
   display:flex;
   justify-content: centre;
 }
 
 </style>
  <div class="dock">
    <button><slot name="item1" /></button>
    <button><slot name="item2" /></button>
    <button><slot name="item3" /></button>
 </div>
 
 `

/**
 * Window class can consits of an app that view in the window. i.e when you press the app icon on the dock, a window should pop up.
 */
class myDock extends HTMLElement {
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
    this.dock = this.shadowRoot.querySelector('.dock')
  }

  /**
   * On keyup event.
   *
   * @param {object} e event.
   */
  onEnterEvent (e) {
    if (e.keyCode === 13) {
      console.log('hello world')
    }
  }

  /**
   * The docker events.
   */
  events () {
    this.shadowRoot.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        this.onEnterEvent(e)
        button.addEventListener('keyup', this.onEnterEvent(e))
      })
    })
  }

  /**
   *Add event.
   */
  connectedCallback () {
    this.events()
  }

  /**
   * Removes events.
   */
  disconnectedCallback () {
    this.events()
  }
}

window.customElements.define('my-dock', myDock)
