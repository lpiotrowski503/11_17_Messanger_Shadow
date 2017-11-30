import { SpinnerService } from './../../services/spinner.service'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnInit {
  constructor(private spinner: SpinnerService) {}

  ngOnInit() {
    this.spinner.canvas = document.querySelector('canvas')
    this.spinner.c = this.spinner.canvas.getContext('2d')
    this.spinner.canvas.width = window.innerWidth
    this.spinner.canvas.height = window.innerHeight
    // this.spinner.canvas.addEventListener('click', () => {
    //   this.spinner.change = -this.spinner.change
    //   this.spinner.start = this.spinner.change
    //   console.log(this.spinner.start)
    // })
    this.spinner.go()
  }
}
