import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

const auth = (req, res, next) =>{
    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({
        error: 'Usuário não autorizado',
        code: 'token-not-found'
    })
    const bearer = authorization.split(' ')[0]
    if (bearer !== 'Bearer') return res.status(401).json({
        error: 'Usuário não autorizado',
        code: 'bearer-not-found'
    })
    const token = authorization.split(' ')[1]
    if (!token) return res.status(401).json({
        error: 'Usuário não autorizado',
        message: 'Use o Padrão Bearer Token ###AccessToken### no Header Autorization',
        code: 'token-not-found'
    })
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
        if (error) return res.status(401).json({
            error: 'Usuário não autorizado',
            message: error.message,
            code: 'invalid-token'
        })
        req.userLogged = {id: decoded.id, name: decoded.name}
    })
    next()
}

export default auth