import express from 'express'
import {PORT, HOST} from './config.js'
import {users} from './db-memory/user.js'
import logger from './middlewares/logger.js'

const app = express()

//middleware
app.use(express.json())
app.use(logger)

//routes
app.get('/', (req, res) => {
  res.send({message: "Bem-vindo a API!"})
})

app.get('/products', (req, res) => {
  res.send({message: "Rota de produtos"})
})

app.get('/user', (req, res) => {
  res.json({
    success: "Usuários listados com sucesso",
    users
  })
})

app.post('/user', (req, res) => {
  const user = req.body
  user.id = users[users.length - 1].id + 1
  users.push(user)
  res.json({
    success: "Usuários adicionado com sucesso",
    users
  })
})

app.put('/user', (req, res) => {
  const newUser = req.body
  const usersResult = users.map(user => {
    if (newUser.id === user.id){
      return {
        id: user.id,
        name: newUser.name || user.name,
        email: newUser.email || user.email,
        avatar: newUser.avatar || user.avatar
      }
    }
    return user
  })
  res.json({
    success: "Usuário atualizado com sucesso",
    usersResult
  })
})

app.delete('/user', (req, res) => {
  const id = req.body.id
  const usersResult = users.filter(user => user.id !== id)
  res.json({
    success: `Usuário ${id} removido com sucesso`,
    usersResult
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na Porta ${HOST}:${PORT}`)
})