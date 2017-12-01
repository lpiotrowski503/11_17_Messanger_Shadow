import { SpinnerService } from './../../services/spinner.service'
import { LangService } from './../../services/lang.service'
import { Router } from '@angular/router'
import { AuthService } from './../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { ValidateService } from './../../services/validate.service'
import { Component, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  nick: string
  pass: string

  constructor(
    private validate: ValidateService,
    private flashMsg: FlashMessagesService,
    private auth: AuthService,
    private router: Router,
    public strings: LangService,
    private spinner: SpinnerService
  ) {}

  onRegisterSubmit() {
    this.spinner.spinnerControler()
    const user = {
      nick: this.nick,
      pass: this.pass
    }

    // validation user correct
    if (!this.validate.validateRegister(user)) {
      this.flashMsg.show(this.strings.lang.messages.noCompleted, {
        cssClass: 'alert-error',
        timeout: 5000
      })
      this.spinner.spinnerControler()
      return false
    }

    // register user to mongodb
    this.auth.signUser(user, 'register').subscribe(data => {
      if (data.success) {
        this.flashMsg.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 5000
        })
        this.router.navigate(['/login'])
      } else {
        this.flashMsg.show(data.msg, {
          cssClass: 'alert-error'
        })
        this.router.navigate(['/register'])
      }
    })
    this.spinner.spinnerControler()
  }
}
