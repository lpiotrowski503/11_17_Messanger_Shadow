import { ChatService } from './services/chat.service'
import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app'

  constructor(private chat: ChatService) {}

  tryGetLocalStorageUser() {
    try {
      return this.chat.getLocalStorageUser()
    } catch (e) {
      return false
    }
  }

  ngOnInit() {
    if (this.tryGetLocalStorageUser()) {
      console.log(this.chat.getLocalStorageUser())
      this.chat.connect()
    }
  }

  ngOnDestroy() {
    this.chat.disconnect()
  }
}
