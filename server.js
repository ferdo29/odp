const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ClientUdp = require("./server/clientUdp");
const fsPromises = require("node:fs/promises");

const PORT = 3000


const ResponseMessage = {
    success: {
        isSuccess: true
    },
    error: {
        isSuccess: false
    }
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/static', express.static("./public/udp"))

app.post('/', async (req, res) => {
    const client = new ClientUdp()
    client
        .clientSend(req.body)
        .finally(() => client.close())

    res.json(ResponseMessage.success)
})
app.get('/udp/get-list', async (req, res) => {

    const result = await fsPromises.readdir('./public/udp')
    console.log(result)

    res.json(result.map(value => `/static/${value}`))

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
