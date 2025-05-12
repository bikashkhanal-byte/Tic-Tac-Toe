

const express = require('express')
const app = express()
const port = 3000

const db = [
    {
        name: "Joe",
        roll: 1
    },
    {
        name: "Moe",
        roll: 2
    }
]

app.get('/', (req, res) => {
console.log("Hello world");
  res.json(db[0])

})

app.listen(port , "192.168.1.12", () => {
  console.log(`Example app listening on port ${port}`)
})
