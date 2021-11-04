class Paddle {
    constructor(id, gameWidth, gameHeight) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.id = id
        this.scale = {
            width: 120,
            height: 15
        }
        this.speed = 0
        this.maxSpeed = 6
        switch (this.id) {
            case 1:
                this.position = {
                    x: this.gameWidth / 2 - this.scale.width / 2,
                    y: this.gameHeight - this.scale.height * 3
                }
                break
            case 2:
                this.position = {
                    x: this.gameWidth / 2 - this.scale.width / 2,
                    y: this.scale.height * 3
                }
        }
    }
    moveLeft() {
        this.speed = -this.maxSpeed
    }
    moveRight() {
        this.speed = this.maxSpeed
    }
    stop() {
        this.speed = 0
    }
    update() {
        this.position.x += this.speed

        if (this.position.x <= 0) this.position.x = 0
        if (this.position.x + this.scale.width >= this.gameWidth) this.position.x = this.gameWidth - this.scale.width
    }
}

module.exports = Paddle