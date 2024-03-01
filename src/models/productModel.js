import {products} from "../db-memory/products.js"

const list = () => {
    return products
}   

const create = (product) => {
    product.id = products[products.length - 1].id + 1
    products.push(product)
    return products
}

const edit = () => {
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

export default {list, create, edit, remove}