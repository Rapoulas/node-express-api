import productModel from "../../models/productModel.js"

const remove = (req, res) => {
    const id = req.body.id
    const dataValidated = productModel.validateIdProduct(id)
    if (!dataValidated.success){
      res.status(400).json({
        success: "Dados inválidos!",
        fields: dataValidated.error.flatten().fieldErrors
      })
    }
    const productsResult = productModel.remove(id)
    res.json({
      success: `Produto ${id} removido com sucesso`,
      productsResult
    })
  }

export default remove