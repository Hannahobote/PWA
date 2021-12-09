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
  <slot> <!--takes in an image! document later!-->
  </div>
 `

 /**
  * Window class can consits of an app that view in the window. i.e when you press the app icon on the dock, a window should pop up.
  */
 class myIcon extends HTMLElement {
  constructor() {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    /**
     * The entire window element
     */
    this.dock=this.shadowRoot.querySelector('.dock')
    
  }

 }

 window.customElements.define('my-icon', myIcon);
 
 