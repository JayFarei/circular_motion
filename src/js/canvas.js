import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']


// Functions

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Instatiate the class objects
class particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    // to make sure the spawn is different, get a random value anywhere from 0 to Pi*2 -> which is the entire travel of a circle
    this.radians = Math.random() * Math.PI * 2
    this.velocity = 0.05
    // to ensure the dot stays on the circle rather than being randomly generated every time
    this.distanceFromCenter = {x:randomIntFromRange(50, 120), y:randomIntFromRange(50, 120) }

    this.update = () => {
      // x is the original position / adding the radians cos (between -1 & 1) / need to move it over time => velocity
      // += => increase by / seems to save me a loop
      this.radians += this.velocity

      // circular motion
      this.x = x + Math.cos(this.radians)*this.distanceFromCenter.x
      this.y = y + Math.sin(this.radians)*this.distanceFromCenter.y
      //console.log(innerWidth)
      this.draw ()
      // to troubleshoot use console.log() and open the console in the browser
    }
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation
let particles
function init() {
  particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push(new particle(canvas.width / 2, canvas.width / 2, 5, 'blue'))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  particles.forEach(particle => {
   particle.update()
  })
}

init()
animate()
