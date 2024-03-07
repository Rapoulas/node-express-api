import userModel from "../../models/userModel.js"

const getById = (req, res) => {
    const {id} = req.params
    const dataValidated = userModel.validateId(+id)
    if (!dataValidated.success){
        res.status(400).json({
          success: "Dados inválidos!",
          fields: dataValidated.error.flatten().fieldErrors
        })
      }
    res.json({
      success: "Usuários listados com sucesso",
      users: userModel.listById(+id)
    })
}

export default getById