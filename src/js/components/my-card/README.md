### How to use my-cardtwo (version 2)
import component to your current file eg:
`import './js/components/my-cardV2/my-cardV2.js'` 

### Add component to your html
`<my-cardtwo> <my-cardtwo/>`

this component does not take any slots. <br/>
Set the color of the card through `setColor()` <br/>
Flip the card wih `flip()` <br/>
If card is matched use `hideCard()` <br/>
Get accses to the Element trough `this.cardElement = this.shadowRoot.querySelector('my-cardtwo')` and then wrtie the method `this.cardElement.hideCard()`