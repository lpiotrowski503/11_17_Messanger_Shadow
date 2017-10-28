import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from './../../services/auth.service'
import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  constructor(
    public auth: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService
  ) {}

  goOut() {
    this.auth.logOut()
    this.flashMsg.show('you are logout', {
      cssClass: 'alert-success',
      timeout: 5000
    })
    this.router.navigate([''])
    return false
  }

  // logout
  onLogoutClick() {
    this.goOut()
  }
}
