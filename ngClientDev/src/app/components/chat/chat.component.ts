import { LangService } from './../../services/lang.service'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent implements OnInit {
  constructor(public strings: LangService) {}

  ngOnInit() {}
}
