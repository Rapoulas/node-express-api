import express from 'express'
import {PORT, HOST} from './config.js'
import {users} from './db-memory/user.js'
import logger from './middlewares/logger.js'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'

const app = express()

//middleware
app.use(express.json())
app.use('/user', logger)

//routes
app.get('/', (req, res) => {
  res.send({message: "Bem-vindo a API!"})
})

app.use('/user', userRouter)
app.use('/product', productRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando na Porta ${HOST}:${PORT}`)
})