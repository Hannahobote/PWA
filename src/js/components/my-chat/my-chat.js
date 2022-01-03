/* eslint-disable jsdoc/check-examples */
/**
 * Template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style> 

  </style>

  <div> welcome to the chat </div>
<form name="chat-app" id="chat-app">
  <input type="text" name="msg" id="msgInput">
  <input type="submit" value="Send" id="sendMsg">
</form>
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
    this.socket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
    this.connectToSocket()
    // set username
    this.setUsername()
    this.sendMsgBtn = this.shadowRoot.querySelector('#sendMsg')
    this.chatAppForm = this.shadowRoot.querySelector('#chat-app')
    this.msgInput = this.shadowRoot.querySelector('#msgInput')
  }

  /**
   * Connect to socket.
   */
  connectToSocket () {
    /**
     * Notify if socket is connected.
     */
    this.socket.onopen = function () {
      console.log('connection established, sending to server')
    }

    /**
     * Notifies us if theres a msg from the server.
     *
     *@param {object} event socket event.
     */
    this.socket.onmessage = function (event) {
      console.log('msg from the server')
      console.log(event.data)

      // append msg from server to DOM
      this.appendMsg(event.data)
    }

    /**
     * Check is socket is disconnected.
     */
    this.socket.onclose = function () {
      console.log('connection closed')
    }
  }

  /**
   *
   */
  setUsername () {
    this.name = prompt('whats your name?')
  }

  /**
   * @param msg
   */
  sendMsgToServer (msg) {
    // create message
    const messageToSend = {
      type: 'message',
      data: msg,
      username: this.name,
      channel: 'aot',
      key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
    }
    // send message to server
    this.socket.send(JSON.stringify(messageToSend))
  }

  /**
   * @param msg
   */
  appendMsg (msg) {
    const div = document.createElement('div')
    div.innerText = msg
    this.chatAppForm.appendChild(div)
  }

  /**
   * Prevents submit.
   *
   * @param {object} e event.
   */
  prevent (e) {
    e.preventDefault()
    console.log('submit prevented')
  }

  /**
   *
   */
  connectedCallback () {
    this.chatAppForm.addEventListener('submit', this.prevent)

    // send msg to server
    this.sendMsgBtn.addEventListener('click', () => {
      console.log(this.msgInput.value)
      this.sendMsgToServer(this.msgInput.value)
      // clear the input box
      this.msgInput.value = ''
    })
  }
}

window.customElements.define('my-chat', myChat)
