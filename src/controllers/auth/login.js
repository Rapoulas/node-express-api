import userModel from "../../models/userModel.js"
import {compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from "../../config.js"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const login = async (req, res) => {
    //lembrar try catch
    const {email, pass} = req.body

    //pegar pass (hash) buscando pelo email 
    const userFound = await userModel.getByEmail(email)
    if(!userFound) return res.status(401).json({
        error: "Email ou senha inválida!"
    })
    //verificar se o hash é válido (bcrypt)
    const isValid = await compare(pass, userFound.pass)
    if(!isValid) return res.status(401).json({
        error: "Email ou senha inválida!"
    })

    //continuar o login e gerar os token de acesso
    const accessToken = await jwt.sign(
        {id: userFound.id, name: userFound.name}, // payload -> dados que você quer guardar no token
        SECRET_KEY, // chave secreta
        {expiresIn: '1m'} 
        )
        
        console.log(accessToken)
    
    const refreshToken = await jwt.sign(
        {id: userFound.id, name: userFound.name}, // payload -> dados que você quer guardar no token
        SECRET_KEY, // chave secreta
        {expiresIn: '3m'} 
        )

    await prisma.session.update({
		where:{
			id: userFound.id,
            token: token,
		},
		data: {
            token: refreshToken
        }
    })

    delete userFound.pass
    return res.json({
		success: `Usuário do login!`,
		user: userFound,
        accessToken,
        refreshToken
	})

}

export default login