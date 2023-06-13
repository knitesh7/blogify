import { validateToken } from '../services/authentication.js'
import userModeler from '../models/user.js'


const validateLogin = async (req, res, next) => {
    try {
        const receivedToken = req.cookies["token"]
        if (!receivedToken) {
            return res.redirect('/user/signin')
        } else {
            const userPayloadIfLoginVerified = await validateToken(receivedToken)
            req.user = await userModeler.findById(userPayloadIfLoginVerified._id)
            next()
        }
    } catch (error) {
        return res.redirect('/user/signin')
    }
}

export default validateLogin