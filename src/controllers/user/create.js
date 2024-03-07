import userModel from "../../models/userModel.js"

const create = (req, res) => {
    const user = req.body
    const dataValidated = userModel.validateCreateUser(user)
    if (!dataValidated.success){
      res.status(400).json({
        success: "Dados inválidos!",
        fields: dataValidated.error.flatten().fieldErrors
      })
    }

    const result = userModel.create(user)
    res.json({
      success: "Usuários adicionado com sucesso",
      users: result
    })
  }
  

export default create