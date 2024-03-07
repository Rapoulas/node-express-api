import {products} from "../db-memory/products.js"
import {z} from 'zod'

const productSchema = z.object({
  id: z.number({
    required_error: "ID é obrigatório",
    invalid_type_error: "ID deve ser um número",
  }), 
  name: z.string({
  }).min(3, {message: "O nome do produto deve ter no mínimo 3 caracteres"})
    .max(200, {message: "O nome do produto deve ter no máximo 200 caracteres"}),
  value: z.number({
  }).min(0, {message: "O valor deve ser maior que 0"}),
  foto: z.string({
    required_error: "Foto é obrigatória",
    invalid_type_error: "Foto deve ser um URL",
  }).url({
  }),
  category: z.string({
    required_error: "Categoria é obrigatória",
    invalid_type_error: "Categoria deve ser uma string"
  })
})

const validateCreate = (product) => {
  const partialProductSchema = productSchema.partial({id: true})
  return partialProductSchema.safeParse(product)
}

const validateEditProduct = (product) => {
  return productSchema.safeParse(product)
}

const validateIdProduct = (id) => {
  const partialProductSchema = productSchema.partial({
    name: true,
    value: true,
    foto: true,
    category: true
  })
  return partialProductSchema.safeParse({id})
}

const list = () => {
    return products
}   

const create = (product) => {
    product.id = products[products.length - 1].id + 1
    products.push(product)
    return products
}

const edit = (newProduct) => {
    return products.map(products => {
        if (newProduct.id === products.id){
          return {
            id: products.id,
            name: newProduct.name || products.name,
            email: newProduct.email || products.value,
            avatar: newProduct.avatar || products.category,
            photo: newProduct.photo || products.photo
          }
        }
        return products
      })
}

const remove = (id) => {
    return products.filter(user => products.id !== id)
}

export default {list, create, edit, remove, validateCreateProduct: validateCreate, validateEditProduct, validateIdProduct}