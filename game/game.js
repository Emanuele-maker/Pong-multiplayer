const Paddle = require("./paddle.js")
const Ball = require("./ball.js")
const collisionPaddleBall = require("./collision.js")

class Game {
    constructor() {
        this.width = 800
        this.height = 800
        this.paddles = [new Paddle(1, this.width, this.height), new Paddle(2, this.width, this.height)]
        this.ball = new Ball(this.width, this.height)

        this.score1 = 0
        this.score2 = 0
        this.winner = -1
        this.isWaiting = false

        this.gameObjects = [this.paddles, this.ball]
    }
    reset() {
        this.ball.position.x = this.width / 2 - this.ball.radius / 2
        this.ball.position.y = this.height / 2 - this.ball.radius / 2
        this.paddles.forEach(paddle => paddle.position.x = this.width / 2 - paddle.scale.width / 2)
    }
    restart() {
        this.reset()
        this.winner = -1
        this.score1 = 0
        this.score2 = 0
    }
    update() {
        this.gameObjects.forEach(object => {
            if (Array.isArray(object)) {
                object.forEach(obj => obj.update())
            } else {
                object.update()
            }
        })

        this.paddles.forEach(paddle => {
            if (collisionPaddleBall(paddle, this.ball)) {
                if (paddle.id === 1) {
                    this.ball.position.y = paddle.position.y - this.ball.radius - 10
                } else {
                    this.ball.position.y = paddle.position.y + this.ball.radius + 10
                }
                this.ball.speed.y = -this.ball.speed.y
            }
        })

        if (this.ball.position.y < 0) {
            this.score1++;
            this.reset()
        }
        if (this.ball.position.y > this.height) {
            this.score2++;
            this.reset()
        }
        if (this.score1 === 10) {
            this.winner = 0
            this.restart()
        }
        if (this.score2 === 10) {
            this.winner = 1
            this.restart()
        }
    }
}

module.exports = Game