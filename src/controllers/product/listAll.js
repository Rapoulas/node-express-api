import productModel from "../../models/productModel.js"

const listAll = (req, res) => {
    res.send({
      success: "Produtos listados com sucesso",
      products: productModel.list()
    })
  }

export default listAll