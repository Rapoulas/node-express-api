import userModel from "../../models/userModel.js"

const create = (req, res) => {
    const user = req.body
    const dataValidated = userModel.validateCreate(user)
    console.log(dataValidated)

    if (!dataValidated.success){
      res.status(401).json({
        success: "Dados inválidos!"
      })
    }

    const result = userModel.create(user)
    res.json({
      success: "Usuários adicionado com sucesso",
      users: result
    })
  }
  

export default create