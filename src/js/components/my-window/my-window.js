/**
 * Define template.
 */
 const template = document.createElement('template') // viktigt!!!!
 template.innerHTML = `

 <style>
 body {
   font-family: Arial, Helvetica, sans-serif;
 }
 
 </style>

 <div> from window class  </div>
 <h1> hello form window </h1>
 
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

    // Get elemens here 
    // TODO: Maybee you need to define some default values here
  }
 }

 window.customElements.define('my-window', myWindow);
 
 