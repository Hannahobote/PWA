/* eslint-disable jsdoc/check-examples */
/**
 * Template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style> 

  </style>

  <div> welcome to the chat </div>
  <div id="chat-container"> </div>
<form name="chat-app" id="chat-app">
<textarea rows="4" cols="50" id="msgInput"> </textarea>
 <!-- <input type="text" name="msg" id="msgInput">-->
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
    this.setUsername()
    this.sendMsgBtn = this.shadowRoot.querySelector('#sendMsg')
    this.chatAppForm = this.shadowRoot.querySelector('#chat-app')
    this.msgInput = this.shadowRoot.querySelector('#msgInput')
    this.storage = []
    // set storage array to previous chat history
    this.storage = this.getLocalStorage()
    console.log(this.storage)
  }

  /**
   * Set a chat username.
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
   * Prevents submit.
   *
   * @param {object} e event.
   */
  prevent (e) {
    e.preventDefault()
    // console.log('submit prevented')
  }

  /**
   *
   */
  createLocalStorage () {
    localStorage.setItem('userChat', JSON.stringify(this.storage))
  }

  /**
   *
   */
  getLocalStorage () {
    let chatHistory = localStorage.getItem('userChat')

    if (chatHistory === null) {
      this.createLocalStorage()
      chatHistory = localStorage.getItem('userChat')
    }
    // return in json
    return JSON.parse(chatHistory)
  }

  renderChatHistory() {
    const chatHistory = this.storage
    // put msg in array in localstorage
    // filert view the lastest 20???
    // then show on chat
    const div = document.createElement('div')
    div.innerText = `${chatHistory.username}: ${chatHistory.data}`
    this.shadowRoot.querySelector('#chat-container').appendChild(div)
  }

  /**
   *
   */
  connectedCallback () {
    this.chatAppForm.addEventListener('submit', this.prevent)

    this.socket.addEventListener('message', (event) => {
      const msgJSON = JSON.parse(event.data)
      // everytime theres a new chat, send to local storage.
      this.createLocalStorage()
      this.storage.push({ username: msgJSON.username, data: msgJSON.data })
      console.log(this.storage)
      /* const div = document.createElement('div')
      div.innerText = `${msgJSON.username}: ${msgJSON.data}`
      this.shadowRoot.querySelector('#chat-container').appendChild(div) */
    })

    this.socket.addEventListener('open', () => {
      const div = document.createElement('div')
      div.innerText = `${this.name} joined the chat`
      this.shadowRoot.querySelector('#chat-container').appendChild(div)
      // upon opening the chat, load chat history 
      // put msg in array in localstorage
      // filert view the lastest 20???
      // then show on chat
      const chatHistory = this.storage
      chatHistory.forEach(chat => {
        const div2 = document.createElement('div')
        div2.innerText = `${chat.username}: ${chat.data}`
        this.shadowRoot.querySelector('#chat-container').appendChild(div2)
      })
    })

    this.socket.addEventListener('close', () => {
      const div = document.createElement('div')
      div.innerText = `${this.name} has left the chat`
      this.shadowRoot.querySelector('#chat-container').appendChild(div)
    })
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
