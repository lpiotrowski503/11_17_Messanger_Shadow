import { LangService } from './services/lang.service'
import { ChatService } from './services/chat.service'
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app'

  constructor(private chat: ChatService, private lang: LangService) {}

  tryGetLocalStorageUser() {
    try {
      return this.chat.getLocalStorageUser()
    } catch (e) {
      return false
    }
  }

  getLang(lang) {
    this.lang.getLang(`${lang}`).subscribe(res => {
      this.lang.lang = res
    })
  }

  ngOnInit() {
    if (this.tryGetLocalStorageUser()) {
      console.log(this.chat.getLocalStorageUser())
      this.chat.connect()
    }
    this.getLang(navigator.language)
  }

  ngOnDestroy() {
    this.chat.disconnect()
  }
}
