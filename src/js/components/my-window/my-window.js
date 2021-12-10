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
    this.dragElement(this.window)
    this.pos1= 0
    this.pos2= 0
    this.pos3= 0
    this.pos4= 0
  }

  showWindow () {

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

  dragElement(element) {
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
    // check if element exist 
    if(this.window) {
      this.window.addEventListener('mousedown', (e) => {
        console.log('we move!')
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement();
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag(e, this.window);
      })
    } else{
      element.addEventListener('mousedown', (e) => {
        console.log('we move!')
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement();
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag(e, element);
      })
    }
  }

  elementDrag(e, element){
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position: = pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;
    // set the element's new position:
    element.style.top = (element.offsetTop - this.pos2) + "px";
    element.style.left = (element.offsetLeft) + "px";
  }

   
  closeDragElement(){
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }


 }

 window.customElements.define('my-window', myWindow);
 
 