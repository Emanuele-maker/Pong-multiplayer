function collisionPaddleBall(paddle, ball) {
    const topOfPaddle = paddle.position.y
    const bottomOfPaddle = topOfPaddle + paddle.scale.height
    const leftSideOfPaddle = paddle.position.x
    const rightSideOfPaddle = leftSideOfPaddle + paddle.scale.width

    const topOfBall = ball.position.y
    const bottomOfBall = topOfBall + ball.radius
    const leftSideOfBall = ball.position.x
    const rightSideOfBall = leftSideOfBall + ball.radius

    if (leftSideOfBall >= leftSideOfPaddle && leftSideOfBall <= rightSideOfPaddle && topOfBall >= topOfPaddle && topOfBall <= bottomOfPaddle) {
        return true
    }
    if (rightSideOfBall <= rightSideOfPaddle && rightSideOfBall >= leftSideOfPaddle && topOfBall >= topOfPaddle && topOfBall <= bottomOfPaddle) {
        return true
    }
    if (topOfBall >= topOfPaddle && topOfBall <= bottomOfPaddle && leftSideOfBall >= leftSideOfPaddle && leftSideOfBall <= rightSideOfPaddle) {
        return true
    }
    if (bottomOfBall <= bottomOfPaddle && bottomOfBall >= topOfPaddle && leftSideOfBall >= leftSideOfPaddle && leftSideOfBall <= rightSideOfPaddle) {
        return true
    }
}

module.exports = collisionPaddleBall