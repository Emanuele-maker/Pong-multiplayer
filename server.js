const path = require("path")
const http = require("http")
const socketio = require("socket.io")
const express = require("express")

const makeCode = require("./utils/makeCode")
const Game = require("./game/game")
const { clientJoin, clientLeave, getRoomClients } = require("./utils/clients")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, "/public")))

const game = {}

io.on("connection", socket => {
    let client;
    console.log(`A user has connected to the server! UID: ${socket.id}`)

    function moveLeft(paddleId) {
        if (client)
            game[client.room].paddles[paddleId].moveLeft()
    }

    function moveRight(paddleId) {
        if (client)
            game[client.room].paddles[paddleId].moveRight()
    }

    function stop(paddleId) {
        if (client) {
            game[client.room].paddles[paddleId].stop()
        }
    }

    const handleNewGame = () => {
        const code = makeCode()
        client = clientJoin(socket.id, code)

        socket.join(code)
        socket.number = 0

        socket.emit("gameCode", code)
        socket.emit("init", socket.number)
        game[code] = new Game()
    }

    function startUpdate(gameCode) {
        const state = game[gameCode]
        const intervalId = setInterval(() => {
            state.update()
            io.to(gameCode).emit("gameState", state)
        }, 10)
    }

    const handleJoinGame = (gameCode) => {
        const roomClients = getRoomClients(gameCode)
        const numClients = roomClients.length
        if (roomClients) {
            client = clientJoin(socket.id, gameCode)

            if (numClients === 0) {
                socket.emit("unknownCode")
                return
            } else if (numClients === 2) {
                socket.emit("tooMantPlayers")
                return
            }

            socket.join(gameCode)
            socket.number = 1
            socket.emit("init", socket.number)
            socket.emit("gameCode", gameCode)

            startUpdate(gameCode)
        }
    }

    socket.on("newGame", handleNewGame)
    socket.on("joinGame", handleJoinGame)
    socket.on("moveLeft", moveLeft)
    socket.on("moveRight", moveRight)
    socket.on("stop", stop)

    socket.on("disconnect", () => {
        if (client) {
            clientLeave(socket.id)
            console.log(`A user has disconnected... UID: ${client.id}`)
        }
    })
})

const PORT = 3000

server.listen(process.env.PORT || PORT, () => console.log(`Server started on port ${PORT}`))