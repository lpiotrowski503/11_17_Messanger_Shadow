import { ChatService } from './../../../services/chat.service'
import { Router } from '@angular/router'
import { AuthService } from './../../../services/auth.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  users = []

  constructor(
    private auth: AuthService,
    private router: Router,
    private chat: ChatService
  ) {}

  callUser(user) {
    this.chat.emiter('callUser', {
      users: [user, this.chat.getLocalStorageUser()]
    })
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
      if (
        data.users[0] === JSON.parse(localStorage.getItem('user')).nick ||
        data.users[1] === JSON.parse(localStorage.getItem('user')).nick
      ) {
        this.router.navigate([`/chat/${data._id}`])
      }
    })
    this.chat.setUserTalk()
  }

  ngOnInit() {
    this.connect()
  }
}
