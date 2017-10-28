import { ChatRoom } from './../interfaces/chat-room.interface'
import { Router, ActivatedRoute } from '@angular/router'
import { Talk } from './../interfaces/talk.interface'
import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import { Message } from './../interfaces/message.interface'

@Injectable()
export class ChatService implements Message, Talk, ChatRoom {
  // chat-room interface
  chatRoom: ChatRoom
  chat: string
  keydown: string

  // talk interface
  talk: Talk
  room: string
  users: string[]
  messages: string[]

  // message interface
  message: Message
  user: string
  msg?: string

  socket: any
  connected: boolean

  constructor(private route: ActivatedRoute, private router: Router) {}

  connect() {
    if (!this.connected) {
      this.socket = io.connect('http://localhost:3000')
      this.connected = true
      console.log('connected')
    }
  }

  disconnect() {
    if (this.connected) {
      this.socket.disconnect()
      this.connected = false
      console.log('disconnected')
    }
  }

  reset() {
    this.disconnect()
    this.connect()
  }

  listener(url: string, callback: (parameter: any) => void): void {
    this.socket.on(url, callback)
  }

  emiter(url: string, sendData: {} | string): void {
    this.socket.emit(url, sendData)
  }

  getLocalStorageUser() {
    return JSON.parse(localStorage.getItem('user')).nick
  }

  userWriteListener(chatRoom, on: boolean = true): void {
    document.forms.namedItem('form').addEventListener('keydown', () => {
      if (on) {
        this.emiter(chatRoom, 'somebody writing...')
        on = !on
      }
    })
  }

  getUserOutputMessage(data, user) {
    const output = document.querySelector('#output')
    if (data.user === user) {
      this.outputMessage(data.msg, output, 'red')
    } else {
      this.outputMessage(data.msg, output, 'blue')
    }
  }

  outputMessage(data: string, output, cssClass) {
    output.innerHTML += `<p class='${cssClass}'>${data}</p>`
  }

  sendMessage(input, id, msg: Message) {
    msg.msg = input
    this.emiter('chat-' + id, msg)
    this.userWriteListener('keydown-' + id)
  }

  setUserTalk() {
    this.message = {
      user: this.getLocalStorageUser()
    }
  }

  userLoggedEmiter(logged?: boolean) {
    this.emiter('logged', {
      nick: this.getLocalStorageUser(),
      logged: logged
    })
  }
}
