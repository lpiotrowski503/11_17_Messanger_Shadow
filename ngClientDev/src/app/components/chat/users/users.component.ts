import { LangService } from './../../../services/lang.service'
import { ChatService } from './../../../services/chat.service'
import { Router } from '@angular/router'
import { AuthService } from './../../../services/auth.service'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  users = []
  userCalled = ''

  constructor(
    private auth: AuthService,
    private router: Router,
    private chat: ChatService,
    public strings: LangService
  ) {}

  callUser(user, msg) {
    this.chat.emiter('callUser', {
      msg: msg,
      from: this.chat.getLocalStorageUser(),
      to: user
    })
  }

  cancelCall() {
    this.userCalled = ''
  }

  connect() {
    this.chat.listener('logged', data => {})
    this.chat.listener('getUsers', data => {
      if (data.indexOf(this.chat.getLocalStorageUser()) !== -1) {
        data.splice(data.indexOf(this.chat.getLocalStorageUser()), 1)
        this.users = data
      } else {
        this.users = data
      }
    })
    this.chat.emiter('getUsers', 'getLoggedUsers')
    this.chat.listener('callUser', data => {
      if (data.msg) {
        if (
          data.to === this.chat.getLocalStorageUser() &&
          this.userCalled === ''
        ) {
          this.userCalled = data.from
        }
      } else {
        if (
          data.users[0] === JSON.parse(localStorage.getItem('user')).nick ||
          data.users[1] === JSON.parse(localStorage.getItem('user')).nick
        ) {
          this.router.navigate([`/chat/${data._id}`])
        }
      }
    })
    this.chat.setUserTalk()
  }

  ngOnInit() {
    this.connect()
  }
}
