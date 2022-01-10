import 'emoji-picker-element'
/* eslint-disable jsdoc/check-examples */
/**
 * Template.
 */
const template = document.createElement('template')
template.innerHTML = `

<style>

  form {
    float: left;
  }
  button, input {
    background-color: #eee;
    text-decoration: none;
    border-radius: 25px;
    border: none;
    padding: 10px;
    margine: none;
  }

  textarea {
    border-radius: 25px;
    text-decoration: none;
    border: none;
  }

  #chat-container, #chat-app {
    positon: relative;
  }

  .show {
   display:none;
 }

 emoji-picker {
   float: right;
   resize: both;
 /* width: 100%;
  height: 100%;*/
 }

 #emoji-container {
   positon: relative;
   /*float: right;
  width: 300px;
  height: 150px;*/
 }


  </style>

  <div> welcome to the chat</div>
  <div id="chat-container"> </div>
<form name="chat-app" id="chat-app">
 <textarea rows="2" cols="70" id="msgInput"> </textarea>
  <input type="submit" value="Send" id="sendMsg">
  <button id="emoji">emoji</button>
  <div id="emoji-container"> 
    <emoji-picker class="show" id="emojiEl"></emoji-picker>
  </div>

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
    this.name = this.getLocalStorageName()
    this.sendMsgBtn = this.shadowRoot.querySelector('#sendMsg')
    this.chatAppForm = this.shadowRoot.querySelector('#chat-app')
    this.msgInput = this.shadowRoot.querySelector('#msgInput')
    this.storage = []
    this.chatContainer = this.shadowRoot.querySelector('#chat-container')
    // set storage array to previous chat history
    this.storage = this.getLocalStorage()
    this.emojiBtn = this.shadowRoot.querySelector('#emoji')
    this.emojiElement = this.shadowRoot.querySelector('#emojiEl')
  }

  /**
   * Set a chat username.
   */
  setUsername () {
    this.name = prompt('whats your name?')
  }

  /**
   * @param msg
   * @param channel
   */
  sendMsgToServer (msg, channel) {
    // create message
    const messageToSend = {
      type: 'message',
      data: msg,
      username: this.name,
      channel,
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
  createLocalStorageName () {
    localStorage.setItem('username', JSON.stringify(this.name))
  }

  /**
   *
   */
  getLocalStorageName () {
    let name = localStorage.getItem('username')

    if (name === null) {
      // set username if it DOES NOT exist in local storage
      this.setUsername()
      this.createLocalStorageName()
      name = localStorage.getItem('name')
    }
    // return in json
    return JSON.parse(localStorage.getItem('username'))
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

  /**
   *
   */
  userJoinedChat () {
    const div = document.createElement('div')
    div.innerText = `${this.name} joined the chat`
    this.shadowRoot.querySelector('#chat-container').appendChild(div)
  }

  /**
   *
   */
  userLeftChat () {
    const div = document.createElement('div')
    div.innerText = `${this.name} has left the chat`
    this.chatContainer.appendChild(div)
  }

  /**
   *
   */
  loadChatHistory () {
    this.storage = this.storage.slice(-19)
    console.log(this.storage)
    this.chatContainer.textContent = this.storage
    this.storage.forEach(chat => {
      const div2 = document.createElement('div')
      div2.innerText = `${chat.username}: ${chat.data}`
      this.chatContainer.appendChild(div2)
    })
  }

  /**
   * @param username
   * @param data
   */
  createChat (username, data) {
    const div = document.createElement('div')
    div.innerText = `${username}: ${data}`
    this.chatContainer.appendChild(div)
  }

  /**
   *
   */
  socketMessage () {
    this.socket.addEventListener('message', (event) => {
      // parse data to json
      const msgJSON = JSON.parse(event.data)
      // everytime theres a new chat, send to local storage.
      this.storage.push({ username: msgJSON.username, data: msgJSON.data, channel: msgJSON.channel })
      this.createLocalStorage()
      // delete the first div in container, not the best solution but it works
      if (this.getLocalStorage().length > 19) {
        this.chatContainer.removeChild(this.chatContainer.childNodes[0])
      }
      this.createChat(msgJSON.username, msgJSON.data)
    })
  }

  /**
   *
   */
  socketOpen () {
    this.socket.addEventListener('open', () => {
      this.userJoinedChat()
      // upon opening the chat, load chat history
      this.loadChatHistory()
    })
  }

  /**
   *
   */
  socketClose () {
    this.socket.addEventListener('close', this.userLeftChat())
  }

  /**
   *
   */
  onSendingMsg () {
    // send msg to server
    this.sendMsgBtn.addEventListener('click', () => {
      this.sendMsgToServer(this.msgInput.value, 'aot')
      // clear the input box
      this.msgInput.value = ''
    })
  }

  /**
   *
   */
  schoolChannel () {
    this.socketOpen()
    this.socketMessage()
    this.onSendingMsg()
    this.socketClose()
  }

  /**
   *
   */
  connectedCallback () {
    this.chatAppForm.addEventListener('submit', this.prevent)
    this.schoolChannel()
    this.shadowRoot.querySelector('emoji-picker').addEventListener('emoji-click', event => {
      console.log(event.detail)
      console.log(event.detail.unicode)
      this.msgInput.value = this.msgInput.value + event.detail.unicode
    })

    this.emojiBtn.addEventListener('click', () => {
      this.emojiElement.classList.toggle('show')
    })
  }
}

window.customElements.define('my-chat', myChat)
