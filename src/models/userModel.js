import {users} from '../db-memory/user.js'
import {z} from 'zod'

const userSchema = z.object({
  id: z.number({
    required_error: "ID é obrigatório",
    invalid_type_error: "ID deve ser um número",
  }), 
  name: z.string({
    required_error: "Nome é obrigatório",
    invalid_type_error: "Nome deve ser uma palavra",
  }).min(3).max(200),
  email: z.string({
    required_error: "Email é obrigatório",
    invalid_type_error: "Email deve ser uma palavra",
  }).email(),
  avatar: z.string({
    required_error: "Avatar é obrigatório",
    invalid_type_error: "Avatar deve ser uma palavra",
  }).url()
})

const validateCreate = (user) => {
  const partialUserSchema = userSchema.partial({id: true})
  return partialUserSchema.safeParse(user)
}

const list = () => {
    return users
}   

const create = (user) => {
    user.id = users[users.length - 1].id + 1
    users.push(user)
    return users
}

const edit = () => {
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

export default {list, create, edit, remove, validateCreateUser: validateCreate}