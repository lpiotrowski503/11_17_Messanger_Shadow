import { SpinnerService } from './../../services/spinner.service'
import { LangService } from './../../services/lang.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from './../../services/auth.service'
import { Component, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  controlers: object[]
  langs: object[]
  themes: object[]

  constructor(
    public auth: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService,
    public strings: LangService,
    private spinner: SpinnerService
  ) {
    this.controlers = [
      {
        id: 'home',
        href: '/'
      },
      {
        id: 'chat',
        href: '/chat/users'
      },
      {
        id: 'profile',
        href: '/profile'
      },
      {
        id: 'login',
        href: '/login'
      },
      {
        id: 'register',
        href: '/register'
      },
      {
        id: 'logout',
        href: '/'
      }
    ]

    this.langs = [
      {
        id: 'pl'
      },
      {
        id: 'en'
      }
    ]

    this.themes = [
      {
        id: 'blue-violet-pink-theme'
      },
      {
        id: 'blue-red-yellow-theme'
      },
      {
        id: 'red-yellow-green-theme'
      }
    ]
  }

  changeLang(id) {
    if (id === 'pl') {
      this.strings.getLang('pl').subscribe(res => {
        this.strings.lang = res
      })
    } else if (id === 'en') {
      this.strings.getLang('en').subscribe(res => {
        this.strings.lang = res
      })
    }
    this.showList('langs')
    this.showList('menu')
  }

  loggedIn(id) {
    if (id === 'login' || id === 'register') {
      return !this.auth.loggedIn()
    } else if (id === 'home') {
      return true
    } else {
      return this.auth.loggedIn()
    }
  }

  goOut() {
    this.spinner.spinnerControler()
    this.auth.logOut()
    this.flashMsg.show(this.strings.lang.messages.logOut, {
      cssClass: 'alert-success',
      timeout: 5000
    })
    this.spinner.spinnerControler()
    return false
  }

  routingClick(id) {
    const list = document.getElementById('menu')
    const burger = document.getElementById('burger')
    if (list.className) {
      if (list.className === 'show') {
        list.className = 'hide'
        burger.className = 'close'
        if (id === 'logout') {
          this.goOut()
        }
      } else {
        list.className = 'show'
        burger.className = 'open'
        if (id === 'logout') {
          this.goOut()
        }
      }
    }
  }

  changeTheme(id) {
    const app = document.querySelector('#app')
    if (`${id}Theme` !== app.className) {
      app.className = ''
      app.classList.add(id)
      this.showList('themes')
      this.showList('menu')
    }
  }

  showList(id) {
    const list = document.getElementById(id)
    const burger = document.getElementById('burger')
    const langs = document.getElementById('langs')
    const themes = document.getElementById('themes')
    if (list.className) {
      if (list.className === 'show') {
        list.className = 'hide'
        burger.className = 'close'
        langs.className = 'hide'
        themes.className = 'hide'
      } else {
        list.className = 'show'
        burger.className = 'open'
      }
    }
  }
}
