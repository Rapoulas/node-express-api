import userModel from "../../models/userModel.js"

const remove = (req, res) => {
    const {id} = req.params
    const dataValidated = userModel.validateId(+id)
    if (!dataValidated.success){
      res.status(400).json({
        success: "Dados inválidos!",
        fields: dataValidated.error.flatten().fieldErrors
      })
    }
    const usersResult = userModel.remove(dataValidated.data.id)
    res.json({
      success: `Usuário ${id} removido com sucesso`,
      users: usersResult
    })
}

export default remove