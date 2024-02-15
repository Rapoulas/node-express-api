import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send({message: "Olá mundo!"})
})

app.get('/produto', (req, res) => {
  res.send({message: 'Hello Produto!'})
})

app.listen(port, () => {
  console.log(`Servidor rodando na Porta http://localhost:${port}`)
})