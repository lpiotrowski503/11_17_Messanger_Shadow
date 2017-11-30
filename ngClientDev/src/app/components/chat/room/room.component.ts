import { LangService } from './../../../services/lang.service'
import { ChatService } from './../../../services/chat.service'
import { Router, ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RoomComponent implements OnInit, OnDestroy {
  input: string
  userWriteBool: boolean
  chatHeight: any
  clearInterval = false
  users: any
  userWrite: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chat: ChatService,
    public strings: LangService
  ) {}

  connect(id) {
    this.userWriteBool = false
    this.chat.listener('chatRoom', data => {
      // console.log(data.users)
      this.chat.users = data
      data.messages.forEach(el => {
        this.chat.getUserOutputMessage(el, this.chat.message.user)
      })
    })
    this.chat.emiter('chatRoom', {
      chatRoom: id
    })
    this.chat.listener('chat-' + id, data => {
      this.chat.getUserOutputMessage(data, this.chat.message.user)
      this.userWriteBool = false
    })
    this.chat.listener('keydown-' + id, data => {
      this.userWriteBool = true
      if (this.chat.getLocalStorageUser() === data.users[0]) {
        this.userWrite = data.users[0]
      } else if (this.chat.getLocalStorageUser() === data.users[1]) {
        this.userWrite = data.users[1]
      }
    })
    this.chat.userWriteListener('keydown-' + id)
  }

  windowListener(height) {
    const interval = setInterval(() => {
      if (this.clearInterval) {
        clearInterval(interval)
      } else {
        if (this.chatHeight.offsetHeight > height) {
          const h = this.chatHeight.offsetHeight
          this.scrollBottom(height - 500, 0, 100, 10)
          this.clearInterval = true
          height = this.chatHeight.offsetHeight
        }
      }
    }, 500)
  }

  scrollBottom(
    start: number = 0,
    delay: number = 0,
    speed: number = 1,
    pixels: number = 50
  ) {
    setTimeout(() => {
      const interval = setInterval(() => {
        if (start > this.chatHeight.offsetHeight) {
          clearInterval(interval)
          this.clearInterval = false
          this.windowListener(this.chatHeight.offsetHeight)
        } else {
          start += pixels
          window.scrollTo(0, start)
        }
      }, speed)
    }, delay)
  }

  test(): void {
    const interval = setInterval(() => {
      if (this.chatHeight) {
        this.scrollBottom(this.chatHeight.offsetHeight - 1000, 0, 1, 10)
        clearInterval(interval)
      }
    }, 500)
  }

  sendMessage() {
    this.chat.sendMessage(
      this.input,
      this.route.snapshot.params['id'],
      this.chat.message
    )
    this.input = ''
  }

  exitTalk() {
    this.router.navigate(['chat/users'])
    this.chat.reset()
  }

  areaAutoSizing() {
    const area = document.getElementById('area')
    area.addEventListener('keydown', () => {
      const height = area.scrollHeight - 10
      area.style.cssText = 'height:' + height + 'px;'
    })
  }

  ngOnInit() {
    this.connect(this.route.snapshot.params['id'])
    this.areaAutoSizing()
    this.chatHeight = document.getElementById('chat')
    this.test()
  }

  ngOnDestroy() {
    this.clearInterval = true
    this.chat.reset()
  }
}
