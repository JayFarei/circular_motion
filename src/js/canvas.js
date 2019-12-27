import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#00bdff','#4d39ce','#088eff']

// Functions

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
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
    this.distanceFromCenter = randomIntFromRange(50, 120)

    this.update = () => {
      // before the loop start - I am loggin the previous location
      const lastPoint = {x: this.x, y: this.y}
      // x is the original position / adding the radians cos (between -1 & 1) / need to move it over time => velocity
      // += => increase by / seems to save me a loop
      this.radians += this.velocity

      // circular motion
      this.x = x + Math.cos(this.radians)*this.distanceFromCenter
      this.y = y + Math.sin(this.radians)*this.distanceFromCenter
      //console.log(innerWidth)
      this.draw (lastPoint) // pass it as an argument to draw
      // to troubleshoot use console.log() and open the console in the browser
    }

    this.draw = lastPoint => {
      c.beginPath()
      c.strokeStyle = this.color
      c.lineWidth = this.radius
      // coordinates for particle previous frame (I had to create it in the update function)
      c.moveTo(lastPoint.x, lastPoint.y)
      // coordinates for particle next frame / new location
      c.lineTo(this.x, this.y)
      c.stroke()
      c.closePath()
    }

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
    // adding random size of particles
    const radius = 1+ (Math.random () * 2)
    particles.push(new particle(canvas.width / 2, canvas.width / 2, radius, randomColor(colors)))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  // for each frame we are drawing a new white rectangular on top of it with trasparency, as we lay more on top of each other we start having this effect
  c.fillStyle = 'rgba(255,255,255,0.1)'
  c.fillRect(0, 0, canvas.width, canvas.height)
  // need to have a look at the options available
  particles.forEach(particle => {
   particle.update()
  })
}

init()
animate()
