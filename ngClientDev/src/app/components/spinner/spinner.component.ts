import { SpinnerService } from './../../services/spinner.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.sass']
})
export class SpinnerComponent implements OnInit {
  constructor(private spinner: SpinnerService) {}

  ngOnInit() {
    this.spinner.canvas = document.querySelector('canvas')
    this.spinner.c = this.spinner.canvas.getContext('2d')
    this.spinner.canvas.width = 200
    this.spinner.canvas.height = 200
    // this.spinner.canvas.addEventListener('click', () => {
    //   this.spinner.change = -this.spinner.change
    //   this.spinner.start = this.spinner.change
    //   console.log(this.spinner.start)
    // })
    this.spinner.go()
  }
}
