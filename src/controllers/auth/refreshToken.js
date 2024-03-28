import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config.js'
import userModel from '../../models/userModel.js'
import { prisma } from '@prisma/client'

const refreshToken = (req, res) => {
    let token = false
    //TODO: obter cookie refresh token
    const authorization = req.headers?.authorization
    if (authorization) token = authorization.split(' ')[1]

    if (!token) return res.status(401).json({
        error: 'Usuário não autorizado',
        message: error.message,
        code: 'token-not-found'
    })
    
    jwt.verify(token, SECRET_KEY, async (error, decoded) => {
        //TODO: verificar tipos de erros para dar a mensagem/code específica
        if (error) return res.status(401).json({
            error: 'Usuário não autorizado',
            message: error.message,
            code: 'invalid-token'
        })
        const userFound = await userModel.getById(decoded.id)
        await prisma.session.findUnique()

        const accessToken = jwt.sign(
            {id: userFound.id, name: userFound.name}, // payload -> dados que você quer guardar no token
            SECRET_KEY, // chave secreta
            {expiresIn: '1m'} 
            )
        const refreshToken = jwt.sign(
            {id: userFound.id, name: userFound.name}, // payload -> dados que você quer guardar no token
            SECRET_KEY, // chave secreta
            {expiresIn: '3m'} 
        )

        
    })
}

export default refreshToken