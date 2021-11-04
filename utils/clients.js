const clients = []

function clientJoin(id, room) {
    const client = { id: id, room: room }
    clients.push(client)
    return client
}

function clientLeave(id) {
    const clientIndex = clients.findIndex(client => client.id === id)
    if (clientIndex !== -1) {
        return clients.splice(clientIndex, 1)
    }
}

function getRoomClients(room) {
    const roomClients = clients.filter(client => client.room === room)

    return roomClients
}

module.exports = {
    clientJoin,
    clientLeave,
    getRoomClients
}