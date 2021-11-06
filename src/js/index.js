// imports all the components. Later on only use this one file and import it to html to get acces to the components ?
import './components/my-window/my-window.js'
import './components/my-card/my-card.js'

/**
 * Define template.
 */
 const template = document.createElement('template') 
 template.innerHTML = `

 <style>
 body {
   font-family: Arial, Helvetica, sans-serif;
 }
 
 </style>
 
 <my-window></my-window>
 <my-card 
 cardBack="https://thumbs.dreamstime.com/b/playing-card-back-side-isolated-white-clipping-path-included-playing-card-back-side-isolated-white-172500899.jpg"
 cardFront="https://media.istockphoto.com/photos/red-apple-with-leaf-isolated-on-white-background-picture-id185262648?k=20&m=185262648&s=170667a&w=0&h=s3mKXNLM2dhLS3m55HYNnuC4aHwcEK_NUd7N5GjBZZ0="
 >
</my-card>
 
 `

 /**
  * Runs the app.
  */
 class myApp extends HTMLElement {
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

 window.customElements.define('my-app', myApp);