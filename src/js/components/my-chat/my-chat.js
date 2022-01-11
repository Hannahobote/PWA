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
    margin: none;
  }

  textarea {
    border-radius: 25px;
    text-decoration: none;
    border: none;
  }

  #chat-container, #chat-app {
    position: relative;
  }

  .show {
   display:none;
 }

 emoji-picker {
   float: right;
   resize: both;
    bottom: -101px;
    position: absolute;
    right: -351px;
  }


 #emoji-container {
   position: relative;
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
    this.chatContainer = this.shadowRoot.querySelector('#chat-container')
    this.emojiBtn = this.shadowRoot.querySelector('#emoji')
    this.emojiElement = this.shadowRoot.querySelector('#emojiEl')
    this.storage = []
    this.storage = this.getChatHistory()
  }

  /**
   * Set a chat username.
   */
  setUsername () {
    this.name = prompt('whats your name?')
  }

  /**
   * Sends message to server.
   *
   * @param {string} msg message to send.
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
   * Prevents submit on the form.
   */
  prevent () {
    this.chatAppForm.addEventListener('submit', (e) => e.preventDefault())
  }

  /**
   * Create local storage for chat history.
   */
  createChatHistory () {
    localStorage.setItem('userChat', JSON.stringify(this.storage))
  }

  /**
   *Get chat history from local storage.
   *
   *@returns {JSON} chat history.
   */
  getChatHistory () {
    let chatHistory = localStorage.getItem('userChat')

    if (chatHistory === null) {
      this.createChatHistory()
      chatHistory = localStorage.getItem('userChat')
    }
    // return in json
    return JSON.parse(chatHistory)
  }

  /**
   *Create local storage for the username.
   */
  createLocalStorageName () {
    localStorage.setItem('username', JSON.stringify(this.name))
  }

  /**
   *Get username from local storage.
   *
   @returns {string} username
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
   * Saves chat to local storage.
   *
   * @param {object} chat includes key and value for username and data eg {username, data}.
   */
  saveChatToLocalStorage (chat) {
    this.storage.push(chat)
  }

  /**
   *Displays msg that user has joined the chat.
   */
  userJoinedChat () {
    const username = this.name
    const data = ' joined the chat'
    this.createChat(username, data)
    this.saveChatToLocalStorage({ username, data })
  }

  /**
   *Displays msg that user has left the chat.
   */
  userLeftChat () {
    const username = this.name
    const data = ' has left the chat'
    this.createChat(username, data)
    this.saveChatToLocalStorage({ username, data })
  }

  /**
   * Takes the lastest 20 chats in array and sets it as the new array value.
   */
  filterChatHistory () {
    this.storage = this.storage.slice(-19)
    // this.chatContainer.textContent = this.storage
  }

  /**
   * Remove the first chat from DOM when a new msg gets sent.
   */
  filterChatFromDOM () {
    if (this.getChatHistory().length > 19 || this.getChatHistory().length === null) {
      this.chatContainer.removeChild(this.chatContainer.childNodes[0])
    }
  }

  /**
   * Renders chat history when you open the chat again.
   */
  loadChatHistory () {
    this.filterChatHistory()
    this.storage.forEach(chat => {
      const { username, data } = chat
      this.createChat(username, data)
    })
  }

  /**
   * Creates a new chat to the DOM.
   *
   * @param {string} username name of user.
   * @param {string} data msg to send.
   */
  createChat (username, data) {
    const div = document.createElement('div')
    div.innerText = `${username}: ${data}`
    this.chatContainer.appendChild(div)
  }

  /**
   * When socket connects.
   */
  socketOpen () {
    this.socket.addEventListener('open', () => {
      // this.userJoinedChat()
      // upon opening the chat, load chat history
      this.loadChatHistory()
    })
  }

  /**
   *When socket gets a new msg.
   */
  socketMessage () {
    this.socket.addEventListener('message', (event) => {
      // parse data to json
      const msgJSON = JSON.parse(event.data)
      const { username, data, channel } = msgJSON
      this.saveChatToLocalStorage({ username, data, channel })
      this.createChat(username, data)
      this.filterChatFromDOM()
      this.createChatHistory()
    })
  }

  /**
   *When socket closes.
   */
  socketClose () {
    // this.socket.addEventListener('close', this.userLeftChat())
  }

  /**
   *When sending msg to server,take input value from textarea and send it as a string, then clear input box.
   */
  onSendingMsg () {
    // send msg to server
    this.sendMsgBtn.addEventListener('click', () => {
      this.sendMsgToServer(this.msgInput.value)
      // clear the input box
      this.msgInput.value = ''
    })
  }

  /**
   * When an emoticon is picked, add it to the input box.
   */
  onEmojiClick () {
    this.shadowRoot.querySelector('emoji-picker').addEventListener('emoji-click', event => {
      this.msgInput.value = this.msgInput.value + event.detail.unicode
    })
  }

  /**
   * Show or hide the emoji-picker element.
   */
  toggleEmoji () {
    this.emojiBtn.addEventListener('click', () => {
      this.emojiElement.classList.toggle('show')
    })
  }

  /**
   * Connects to the school server.
   */
  schoolChannel () {
    this.socketOpen()
    this.socketMessage()
    this.onSendingMsg()
    this.socketClose()
  }

  /**
   * All events in the chat app.
   */
  chatEvents () {
    this.schoolChannel()
    this.prevent()
    this.onEmojiClick()
    this.toggleEmoji()
  }

  /**
   * Adds event.
   */
  connectedCallback () {
    this.chatEvents()
  }

  /**
   * Removes event.
   */
  disconnectedCallback () {
    this.chatEvents()
  }
}

window.customElements.define('my-chat', myChat)
