import jwt from 'jsonwebtoken'
const secretKey = 'CatchMeLOL'

const generateToken = (user) => {
    try {
        const { _id,email, fullName, role,about } = user
        const payload = { _id,fullName, email , role,about }
        const token = jwt.sign(payload, secretKey)
        return token
    } catch (error) {
        return error.message
    }
}

const validateToken = (token) => {
    try {
        const payload = jwt.verify(token, secretKey)
        return payload
    } catch (error) {
        return error.message
    }
}



export {generateToken,validateToken}