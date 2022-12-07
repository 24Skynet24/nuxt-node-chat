import ws from "ws"
import {v4 as uuid} from "uuid"

const { Server } = ws

const wss = new Server({port: 8000})

const state = {
    connections: {}
}

const send = (to, payload) => {
    state.connections[to].ws.send(JSON.stringify(payload))
}

const sendWithout = (connectionId, payload) => {
    for (const key in state.connections) {
        if (key !== connectionId) {
            send(key, payload)
        }
    }
}

const methods = {
    updateProfile: (payload) => {
        state.connections[payload.id].profile.username = payload.username;

        sendWithout(payload.id, {
            type: 'updateProfile',
            data: payload
        })
    }
}

wss.on("connection", (ws) => {
    console.log('New connection');

    const existsConnections = Object.keys(state.connections)

    const connectionId = uuid();

    state.connections[connectionId] = {
        ws: null,
        profile: {
            username: null
        }
    }

    state.connections[connectionId].ws = ws;

    sendWithout(connectionId, {
        type: 'new',
        connectionId: connectionId
    })

    send(connectionId, {
        type: 'new',
        id: connectionId,
        otherConnections: existsConnections
    })

    ws.on('message', (message) => {
        const data = JSON.parse(message)

        methods[data.type](data.data)
    })

    ws.on('close', () => {
        console.log("Client id closed")
    })
});

/*
import ws from "ws"
import {v4 as uuid} from "uuid"

const { Server } = ws

const connects = {}
const wss = new Server({port: 8000})
const allUsers = {}

const sendUser = (to, payload) => {
    connects[to].send(JSON.stringify(payload))
}
const sendAll = (payload) => {
    for (let i in connects) sendUser(i, payload)
}

// Подключение
wss.on("connection", (ws) => {
    const uid = uuid()
    connects[uid] = ws

    console.log("Connection success")
    ws.send(JSON.stringify(allUsers))

    // Сообщения от клиента
    ws.on('message', (rawMessage) => {
        const messageTypes = {
            1: ( userName ) => {
                const temp = {
                    id: uid,
                    messages: {
                        id: {}
                    },
                    username: userName,
                }
                sendAll({
                    type: 1,
                    payload: temp
                })
                allUsers[uid] = temp
            },

            2: (user) => {
                allUsers[user.id].messages.push(user.msg)
                sendUser(user.msg.to, {
                    type: 2,
                    payload: allUsers[user.msg.to]
                })
                console.log(allUsers[user.msg.to])
            },
        }

        const message = JSON.parse(rawMessage)
        messageTypes[message.type](message.data)
    })

    // Закрытие клиента
    ws.on('close', () => {
        delete connects[uid]
        console.log("Client id closed")
    })
})
*/
