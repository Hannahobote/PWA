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

 .dock {
   background-color:#eee;
   width: 1500px;
   height:750px;
   background-color: #eee;
   display:flex;
   justify-content: centre;
 }
 
 </style>
  <div class="dock">
    <p><slot name="item1" /></p>
    <p><slot name="item2" /></p>
    <p><slot name="item3" /></p>
 </div>
 
 `

 /**
  * Window class can consits of an app that view in the window. i.e when you press the app icon on the dock, a window should pop up.
  */
 class myDock extends HTMLElement {
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

 window.customElements.define('my-dock', myDock);
 
 