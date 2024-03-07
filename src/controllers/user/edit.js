import userModel from "../../models/userModel.js"

const edit = (req, res) => {
    const newUser = req.body
    const dataValidated = userModel.validateEdit(newUser)
    if(!dataValidated.success){
      res.status(400).json({
        success: "Dados inválidos!",
        fields: dataValidated.error.flatten().fieldErrors
      })
    }
    const usersResult = userModel.edit(dataValidated.data)
    res.json({
      success: "Usuário atualizado com sucesso",
      users: usersResult
    })
  }

export default edit