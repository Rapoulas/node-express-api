import productModel from "../../models/productModel.js"

const edit = (req, res) => {
    const newProduct = req.body
    const dataValidated = productModel.validateEditProduct(newProduct)
    if(!dataValidated.success){
      res.status(400).json({
        success: "Dados inválidos!",
        fields: dataValidated.error.flatten().fieldErrors
      })
    }
    const productsResult = productModel.edit(newProduct)
    res.json({
      success: "Produto atualizado com sucesso",
      products: productsResult
    })
  }

export default edit