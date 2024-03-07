import productModel from "../../models/productModel.js"

const create = (req, res) => {
    const product = req.body
    const dataValidated = productModel.validateCreateProduct(product)
    if (!dataValidated.success){
      res.status(400).json({
        success: "Dados inválidos!",
        fields: dataValidated.error.flatten().fieldErrors
      })
    }
    const result = productModel.create(product)
    res.json({
      success: "Produto adicionado com sucesso",
      products: result
    })
  }

export default create