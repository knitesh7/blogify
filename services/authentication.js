import jwt from 'jsonwebtoken'
const secretKey = 'CatchMeLOL'

const generateToken = (user) => {
    try {
        const { _id,email, fullName, profileImageUrl, role } = user
        const payload = { _id,fullName, email, profileImageUrl, role }
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