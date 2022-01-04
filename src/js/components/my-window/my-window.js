/* eslint-disable jsdoc/check-examples */
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
   background-color: #dad4a4;
 }

 .container {
  position: absolute;
 }

 .show {
   display:none;
 }

 .controllPanel {
   background-color:#eee;
   width: 1000px;
   height:30px;
 }

 .active {
  border: 2px solid black;
  outline: blue solid 10px;
 }

 </style>
  <div class="container" id="mydiv">
    <div >Click here to move</div>
    <div class="controllPanel" id="mydivheader"> 
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
 *
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
      .appendChild(template.content.cloneNode(true))
    this.deleteBtn = this.shadowRoot.querySelector('.delete')
    this.container = this.shadowRoot.querySelector('.container')
    this.controllPanel = this.shadowRoot.querySelector('.controllPanel')
    this.window = this.shadowRoot.querySelector('.window')
    this.dragValue = null
    this.dragElement(this.container)
   // this.dragHeader(this.shadowRoot.querySelector('#mydiv'))
  }

  // eslint-disable-next-line jsdoc/check-examples
  /**
   * Make element Dragabble.
   *
   * @param elmnt the element to drag, in this case the container.
   */
  dragElement (elmnt) {
    /**
     * @param e
     */
    const dragMouseDown = (e) => {
      // copied from: https://www.w3schools.com/howto/howto_js_draggable.asp
      e = e || window.event
      e.preventDefault()
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag
      this.container.classList.add('active')
    }

    let pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0
    console.log(elmnt.id)
    console.log(elmnt.id + 'header')
    if (this.shadowRoot.getElementById(elmnt.id + 'header')) {
      // if present, the header is where you move the DIV from:
      this.shadowRoot.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
      console.log('helloooo')
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown
      console.log('world')
    }

    /**
     * @param e
     */
    const elementDrag = (e) => {
      e = e || window.event
      e.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
      elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
    }

    /**
     *
     */
    const closeDragElement = () => {
      // stop moving when mouse button is released:
      document.onmouseup = null
      document.onmousemove = null
      this.container.classList.remove('active')
    }
  }

  /**
   * @param elmnt
   */
  dragHeader(elmnt) {
    let pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0

    if (document.getElementById(elmnt.id + 'header')) {
      /* if present, the header is where you move the DIV from: */
      document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV: */
      elmnt.onmousedown = dragMouseDown
    }

    /**
     * @param e
     */
    function dragMouseDown (e) {
      e = e || window.event
      e.preventDefault()
      // get the mouse cursor position at startup:
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag
     // this.container.classList.add('active')
    }

    /**
     * @param e
     */
    function elementDrag (e) {
      e = e || window.event
      e.preventDefault()
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + 'px'
      elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px'
    }

    /**
     *
     */
    function closeDragElement () {
    /* stop moving when mouse button is released: */
      document.onmouseup = null
      document.onmousemove = null
      //this.container.classList.remove('active')
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
