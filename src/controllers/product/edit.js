import productModel from "../../models/productModel.js"

const edit = (req, res) => {
    const newProduct = req.body
    const productsResult = productModel.edit(newProduct)
    res.json({
      success: "Produto atualizado com sucesso",
      products: productsResult
    })
  }

export default edit