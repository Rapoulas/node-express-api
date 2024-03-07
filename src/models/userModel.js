import {users} from '../db-memory/user.js'
import {z} from 'zod'

const userSchema = z.object({
  id: z.number({
    required_error: "ID é obrigatório",
    invalid_type_error: "ID deve ser um número",
  }), 
  name: z.string({
  }).min(3, {message: "O nome do usuário deve ter no mínimo 3 caracteres"})
    .max(200, {message: "O nome do usuário deve ter no máximo 200 caracteres"}),
  email: z.string({
  }).email({message: "Email inválido"}),
  avatar: z.string({
    required_error: "Avatar é obrigatório",
    invalid_type_error: "Avatar deve ser uma palavra",
  }).url({
  })
})

const validateCreate = (user) => {
  const partialUserSchema = userSchema.partial({id: true})
  return partialUserSchema.safeParse(user)
}

const validateEdit = (user) => {
  return userSchema.safeParse(user)
}

const validateId = (id) => {
  const partialUserSchema = userSchema.partial({
    name: true,
    email: true,
    avatar: true
  })
  return partialUserSchema.safeParse({id})
}

const list = () => {
    return users
}   

const listById = (id) => {
    return users.find(user => user.id === id)
}   

const create = (user) => {
    user.id = users[users.length - 1].id + 1
    users.push(user)
    return users
}

const edit = (newUser) => {
    return users.map(user => {
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
}

const remove = (id) => {
    return users.filter(user => user.id !== id)
}

export default {list, create, edit, remove, validateCreateUser: validateCreate, validateEdit, validateId, listById}