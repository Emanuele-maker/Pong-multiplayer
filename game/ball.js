class Ball {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.radius = 15
        this.position = {
            x: this.gameWidth / 2 - this.radius / 2,
            y: this.gameHeight / 2 - this.radius / 2
        }
        this.speed = {
            x: 3.3,
            y: 3
        }
    }
    update() {
        this.position.x += this.speed.x
        this.position.y += this.speed.y

        if (this.position.x - 10 <= 0) {
            this.position.x = 10
            this.speed.x = -this.speed.x
            this.increaseSpeed()
        }
        if (this.position.x + this.radius + 10 >= this.gameWidth) {
            this.position.x = this.gameWidth - this.radius - 10
            this.speed.x = -this.speed.x
            this.increaseSpeed()
        }
    }
}

module.exports = Ball