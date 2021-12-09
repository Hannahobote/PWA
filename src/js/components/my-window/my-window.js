/**
 * Define template.
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
 
 </style>
  <div class="container">
    <div class="controllPanel"> 
     <button>-</button>   
     <button>||</button>
     <button class="delete">X</button>
    </div>
    <div class="window"> enter app here 
      <div><slot/></div>
 </div>
 
 `

 /**
  * Window class can consits of an app that view in the window. i.e when you press the app icon on the dock, a window should pop up.
  */
 class myWindow extends HTMLElement {
  constructor() {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true)) // viktigt !!!!.
    this.deleteBtn=this.shadowRoot.querySelector('.delete')
    /**
     * The entire window element
     */
    this.window=this.shadowRoot.querySelector('.container')
    /**
     * The controll panel ontop of the window 
     */
     this.controllPanel=this.shadowRoot.querySelector('.controllPanel')
    // Get elemens here 
    // TODO: Maybee you need to define some default values here
  }

  connectedCallback() {
    this.deleteBtn.addEventListener('click', () => {
      this.window.classList.toggle('show')
    })
  }

  disconnectedCallback() {
    this.deleteBtn.removeEventListener('click', () => {
      this.window.classList.toggle('show')
    })
  }
 }

 window.customElements.define('my-window', myWindow);
 
 