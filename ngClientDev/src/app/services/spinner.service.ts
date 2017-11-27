import { Injectable } from '@angular/core'

@Injectable()
export class SpinnerService {
  canvas: any
  colors: string[][]
  particles: any[]
  c: any

  constructor() {
    this.colors = [
      ['#6502fe', '#e302fe', '#fe029b', '#fe021d', '#fe6502', '#fee302'],
      ['#02fefe', '#0280fe', '#0202fe', '#8002fe', '#fe02fe', '#fe0280'],
      ['#fe0202', '#fe8002', '#fefe02', '#80fe02', '#02fe02', '#02fe80']
    ]
  }

  randomColor = color => {
    return color[Math.floor(Math.random() * color.length)]
  }

  init = () => {
    this.particles = []
    for (let i = 0; i < 300; i++) {
      const radius = Math.random() * 1 + 0.5
      this.particles.push(
        new Particle(
          this.canvas.width / 2,
          this.canvas.height / 2,
          radius,
          this.randomColor(this.colors)
        )
      )
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate)
    this.c.fillStyle = 'rgba(255, 68 , 255, 0.15)'
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.particles.forEach(particle => {
      particle.update()
    })
  }

  go() {
    this.init()
    this.animate()
  }
}

export class Particle {
  x: any
  y: any
  lastY: any
  radius: any
  color: any
  changeColor: any
  radians: any
  velocity: any
  distanceFromCenter: any
  // move: any
  update: any
  draw: any
  randomIntFromRange: any
  canvas: any
  c: any
  colors: any
  start: any

  constructor(x, y, radius, color) {
    this.start = 0
    this.colors = [
      ['#6502fe', '#e302fe', '#fe029b', '#fe021d', '#fe6502', '#fee302'],
      ['#02fefe', '#0280fe', '#0202fe', '#8002fe', '#fe02fe', '#fe0280'],
      ['#fe0202', '#fe8002', '#fefe02', '#80fe02', '#02fe02', '#02fe80']
    ]
    this.canvas = document.querySelector('canvas')
    this.c = this.canvas.getContext('2d')
    this.x = x
    // this.y = y + this.lastY
    this.y = y
    this.radius = radius
    this.color = color[0]
    this.changeColor = () => {
      let i = 0
      setInterval(() => {
        if (i === this.colors.length) {
          i = 0
        } else {
          this.color = color[i]
          i++
        }
      }, 2000)
    }
    this.changeColor()
    this.radians = Math.random() * Math.PI * 2
    this.velocity = Math.random() * 0.03 + 0.01
    this.randomIntFromRange = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    this.distanceFromCenter = this.randomIntFromRange(
      this.canvas.height * 0.2,
      this.canvas.height * 0.3
    )
    // this.lastY = this.canvas.height * 1.5
    // this.move = (arg = 0) => {
    //   if (arg === 1) {
    //     if (this.lastY <= this.canvas.height / 2) {
    //       this.lastY = this.canvas.height / 2
    //       arg = 0
    //     } else {
    //       this.lastY -= 10
    //     }
    //   }
    //   if (arg === -1) {
    //     if (this.lastY <= this.canvas.height * -1.5) {
    //       this.lastY = this.canvas.height * -1.5
    //       arg = 0
    //     } else {
    //       this.lastY -= 10
    //     }
    //   }
    // }
    this.update = () => {
      const lastPoint = {
        x: this.x,
        y: this.y
      }
      this.radians += this.velocity
      this.x = x + Math.cos(this.radians) * this.distanceFromCenter
      // this.y = this.lastY + Math.sin(this.radians) * this.distanceFromCenter
      this.y = y + Math.sin(this.radians) * this.distanceFromCenter
      this.draw(lastPoint)
      // this.move(this.start)
    }
    this.draw = lastPoint => {
      this.c.beginPath()
      this.c.strokeStyle = this.color
      this.c.lineWidth = this.radius
      this.c.lineCap = 'round'
      this.c.moveTo(lastPoint.x, lastPoint.y)
      this.c.lineTo(this.x, this.y)
      this.c.stroke()
      this.c.closePath()
    }
  }
}
