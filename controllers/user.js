import userModeler from "../models/user.js"
import {generateToken} from '../services/authentication.js'

const loginHandler = async(req,res)=>{

    const {email,password} = req.body 
    try {
        const fetchUserIfPasswordVerified = await userModeler.passwordVerifier(email,password)
        const token = await generateToken(fetchUserIfPasswordVerified.toObject())
        return res.cookie("token",token).redirect(`/blog/all`)
    } catch (error) {
        return res.send(error.message)
    }
}
const signUpHandler = async(req,res)=>{
    try {
        const {email,fullName,password} = req.body
        if(req.file){
            const normalizedFilePath = req.file.path.replace(/\\/g, '/');
            await userModeler.create({email,fullName,password,profileImageUrl:normalizedFilePath})
        }else{
            await userModeler.create({email,fullName,password})
        }  
        return res.redirect('/')
    } catch (error) {
        console.log(error.message)
        return res.redirect('/user/signup')
    }
    
}
export {loginHandler,signUpHandler}