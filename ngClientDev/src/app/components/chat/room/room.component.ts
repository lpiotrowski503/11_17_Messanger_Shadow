import { ChatService } from './../../../services/chat.service'
import { Router, ActivatedRoute } from '@angular/router'
import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass']
})
export class RoomComponent implements OnInit, OnDestroy {
  input: string
  userWriteBool: boolean

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private chat: ChatService
  ) {}

  connect(id) {
    this.userWriteBool = false
    this.chat.listener('chatRoom', data => {
      console.log(data)
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
    })
    this.chat.userWriteListener('keydown-' + id)
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

  ngOnInit() {
    this.connect(this.route.snapshot.params['id'])
  }

  ngOnDestroy() {
    this.chat.reset()
  }
}
