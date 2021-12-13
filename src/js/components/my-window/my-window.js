/**
 * Can take in One app of choice.
 */
const template = document.createElement('template')
template.innerHTML = `

 <style>
 body {
   font-family: Arial, Helvetica, sans-serif;
 }

 .window{
   width: 1000px;
   height:500px;
   background-color: grey;
 }

 .show {
   display:none;
 }

 .controllPanel {
   background-color:#eee;
   width: 1000px;
   height:30px;
 }

 .item:active {
      background-color: rgba(168, 218, 220, 1.00);
    }

 </style>
  <div class="container" id="container">
    <div class="controllPanel"> 
      <button>-</button>
      <button>||</button>
      <button class="delete">X</button>
    </div>
   <div class="window">
      <div><slot/></div>
   </div>
  </div>
 `

/**
 * Window class can consits of an app that view in the window. i.e when you press the app icon on the dock, a window should pop up.
 */
class myWindow extends HTMLElement {
  /**
   *
   */
  constructor () {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true)) // viktigt !!!!.
    this.deleteBtn = this.shadowRoot.querySelector('.delete')
    /**
     * The entire window element
     */
    this.container = this.shadowRoot.querySelector('.container')
    /**
     * The controll panel ontop of the window
     */
    this.controllPanel = this.shadowRoot.querySelector('.controllPanel')

    this.window = this.shadowRoot.querySelector('.window')
    console.log(this.container)
    this.dragValue
    this.move()
  }

  /**
   *
   */
  showWindow () {

  }

  /**
   *
   */
  move () {
    // https://www.youtube.com/watch?v=cNh-jFcCGKU
    const element = this.container
    element.style.position = 'absolute'
    /**
     *
     */
    element.onmousedown = () => {
      this.dragValue = element
    }

    /**
     * @param e
     */
    document.onmouseup = (e) => {
      this.dragValue = null
    }

    /**
     * @param e
     */
    document.onmousemove = (e) => {
      const x = e.pageX
      const y = e.pageY

      this.dragValue.style.left = x + 'px'
      this.dragValue.style.top = y + 'px'
    }
  }

  /**
   *
   */
  connectedCallback () {
    this.deleteBtn.addEventListener('click', () => {
      // this.container.classList.toggle('show')
      this.remove()
    })
  }

  /**
   *
   */
  disconnectedCallback () {
    this.deleteBtn.removeEventListener('click', () => {
      // this.container.classList.toggle('show')
      this.remove()
    })
  }
}

window.customElements.define('my-window', myWindow)
