import ws from "ws"
const { Server } = ws
import {v4 as uuid} from "uuid"

const clients = {}
const wss = new Server({port: 8000})
const messages = []

// Подключение
wss.on("connection", (ws) => {
    const id = uuid()
    clients[id] = ws

    console.log("Connection success")

    // Отправка всех сообщений клиенту
    ws.send(JSON.stringify(messages))

    // Сообщения от клиента
    ws.on('message', (rawMessage) => {
        const {name, msg} = JSON.parse(rawMessage)
        messages.push({name, msg})
        for (const id in clients) clients[id].send(JSON.stringify([{name, msg}]))
    })

    // Закрытие клиента
    ws.on('close', () => {
        delete clients[id]
        console.log("Client id closed")
    })
})
