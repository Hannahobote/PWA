/* eslint-disable jsdoc/check-examples */
/**
 * Template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style> 

  </style>

  <div> welcome to the chat </div>
  `
/**
 * Chat app.
 */
class myChat extends HTMLElement {
  /**
   * Constructor.
   */
  constructor () {
    super()

    // Attach a shadow DOM tree to this element and
    // append the template to the shadow root.
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))
    this.connectToSocket()
  }

  /**
   *
   */
  connectToSocket () {
    const socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')

    socket.onopen = function(e) {
      alert("[open] Connection established");
      alert("Sending to server");
      socket.send(
        {
          type: 'message',
          data: 'The message text is sent using the data property',
          username: 'MyFancyUsername',
          channel: 'my, not so secret, channel',
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        }
      )
    }

    socket.onmessage = function (event) {
      console.log(event.data)
    }
  }

  /**
   * @param json
   */
  sentMsg (json) {

  }
}

window.customElements.define('my-chat', myChat)
