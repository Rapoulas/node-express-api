import productModel from "../../models/productModel.js"

const remove = (req, res) => {
    const id = req.body.id
    const productsResult = productModel.remove(id)
    res.json({
      success: `Produto ${id} removido com sucesso`,
      productsResult
    })
  }

export default remove