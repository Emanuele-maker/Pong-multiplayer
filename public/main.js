var socket = io()
var game;

/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

// client-side handling

const gameCodeInput = document.getElementById("game-code-input")
const createGameButton = document.getElementById("create-game")
const joinGameButton = document.getElementById("join-game")
const hostJoinScene = document.getElementsByClassName("menu")[0]
const gameScene = document.getElementsByClassName("game")[0]
const gameCodeElement = document.getElementById("game-code")

createGameButton.addEventListener("click", () => socket.emit("newGame"))
joinGameButton.addEventListener("click", () => socket.emit("joinGame", gameCodeInput.value))

socket.on("init", handleInit)
socket.on("gameCode", (code) => {
    gameCodeElement.innerText = code
})
socket.on("gameState", (state) => {
    game = state
})
socket.on("unknownCode", () => alert("unknownCode"))
socket.on("tooManyPlayers", () => alert("tooManyPlayers"))
var clientId;

function handleInit(clientN) {
    hostJoinScene.style.display = "none"
    gameScene.style.display = "block"

    clientId = clientN
}

canvas.width = 800
canvas.height = 800

// input handling
const keysPressed = []

function handleInputs() {
    window.addEventListener("keydown", (event) => {
        const keyCode = event.keyCode
        if (!keysPressed.includes(keyCode)) keysPressed.push(keyCode)
    })
    window.addEventListener("keyup", (event) => {
        const keyIndex = keysPressed.indexOf(event.keyCode)
        keysPressed.splice(keyIndex, 1)
    })
}

function checkForInputs() {
    if (game) {
        if (keysPressed.includes(37)) {
            socket.emit("moveLeft", clientId)
        }
        if (keysPressed.includes(39)) {
            socket.emit("moveRight", clientId)
        }
        if (!keysPressed.includes(37) && !keysPressed.includes(39)) {
            socket.emit("stop", clientId)
        }
    }
}

function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "white"

    checkForInputs()

    if (game) {
        game.paddles.forEach(paddle => ctx.fillRect(paddle.position.x, paddle.position.y, paddle.scale.width, paddle.scale.height));
        const ball = game.ball
        ctx.beginPath()
        ctx.arc(ball.position.x, ball.position.y, ball.radius, 0, Math.PI * 2, false)
        ctx.fill()
        ctx.font = "25px Comic Sans MS"
        ctx.textAlign = "center"
        ctx.fillText(`${game.score1} - ${game.score2}`, game.width / 2, game.height / 2)
    }

    requestAnimationFrame(renderGame)
}
handleInputs()
renderGame()