import express from "express";
import {validateToken} from '../services/authentication.js'
const basicRouter = express.Router()

const getUserThroughToken = async(token)=>{
    if (!token) {
        return null
    } else {
        const userPayloadIfLoginVerified = await validateToken(token)
        return userPayloadIfLoginVerified
    }
} 

basicRouter.get('/',async(req,res)=>{
    const receivedToken = req.cookies["token"]
    const user = await getUserThroughToken(receivedToken)
    return res.render('home.ejs',{user})
})

basicRouter.get('/logout',(req,res)=>{
    return res.clearCookie("token").redirect('/')
})

export default basicRouter