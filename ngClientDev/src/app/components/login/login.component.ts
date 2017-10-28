import { ChatService } from './../../services/chat.service'
import { Router } from '@angular/router'
import { AuthService } from './../../services/auth.service'
import { Component } from '@angular/core'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  nick: string
  pass: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService,
    private chat: ChatService
  ) {}

  onLoginSubmit() {
    const user = {
      nick: this.nick,
      pass: this.pass
    }

    // save user to mongodb
    this.auth.signUser(user, 'auth').subscribe(data => {
      if (data.success) {
        // save to local storage
        this.auth.saveUserData(data.token, data.user)
        this.chat.connected = false
        this.chat.connect()
        this.chat.userLoggedEmiter(true)

        // go to users page
        this.router.navigate(['chat/users'])

        // send message all ok
        this.flashMsg.show('You are logged', {
          cssClass: 'alert-success',
          timeout: 5000
        })
      } else {
        // send message something wrong
        this.flashMsg.show(data.msg, {
          cssClass: 'alert-error',
          timeout: 5000
        })

        // go back to login page
        this.router.navigate(['login'])
      }
    })
  }
}
