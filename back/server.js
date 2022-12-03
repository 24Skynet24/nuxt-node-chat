import ws from "ws"
import {v4 as uuid} from "uuid"

const { Server } = ws

const connects = {}
const wss = new Server({port: 8000})
const users = {}

// Подключение
wss.on("connection", (ws) => {
    const uid = uuid()
    connects[uid] = ws

    console.log("Connection success")
    // Отправка всех сообщений клиенту
    ws.send(JSON.stringify(users))

    // Сообщения от клиента
    ws.on('message', (rawMessage) => {
        const message = JSON.parse(rawMessage)

        if (Object.keys(users).includes(message.id)) {
            connects[uid].send(JSON.stringify({error: 'User already exists!'}))
            return
        }

        users[message.id] ??= {}

        if (!users[message.id].messages) users[message.id].messages = []
        if (message.msg) users[message.id].messages.push(message.msg)
        users[message.id].name = message.name
        users[message.id].last_msg = '' && message.msg.text

        for (const id in connects) connects[id].send(JSON.stringify(users))
    })

    // Закрытие клиента
    ws.on('close', () => {
        delete connects[uid]
        console.log("Client id closed")
    })
})
