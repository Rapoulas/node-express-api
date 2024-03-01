import userModel from "../../models/userModel.js"

const edit = (req, res) => {
    const newUser = req.body
    const usersResult = userModel.edit(newUser)
    res.json({
      success: "Usuário atualizado com sucesso",
      users: usersResult
    })
  }

export default edit