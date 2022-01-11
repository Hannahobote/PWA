### How to use my-window
import component to your current file eg:
`import './js/components/my-window/my-window.js'` 

### Add component to your html
`<my-window> <my-window/>`

This component takes 1 slot item. Eg. 
```html
  <my-window>
    <my-anime/>
  <my-window>
```

or, you can use it like i did: 
```js
   const window = document.createElement('my-window')
    const chatApp = document.createElement('my-chat')
    window.appendChild(chatApp)
    this.shadowRoot.querySelector('#app2').appendChild(window)
```
Any app of your choice can be put there. This component is also draggable.
<br/>
