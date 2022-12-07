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
                    messages: [],
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
