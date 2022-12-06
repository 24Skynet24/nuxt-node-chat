import ws from "ws"
import {v4 as uuid} from "uuid"

const { Server } = ws

const connects = {}
const wss = new Server({port: 8000})
const allUsers = {}

const sendUsers = () => {
    for (let i in connects) connects[i].send(JSON.stringify(allUsers))
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
                allUsers[userName] = {
                    id: null,
                    last_msg: null,
                    messages: []
                }
            },

            2: (user) => {
                allUsers[user.id].last_msg = user.msg.text
                allUsers[user.id].messages.push(user.msg)
            },
        }

        const message = JSON.parse(rawMessage)
        messageTypes[message.type](message.data)
        sendUsers()
    })

    // Закрытие клиента
    ws.on('close', () => {
        delete connects[uid]
        console.log("Client id closed")
    })
})
