import {Router} from 'express'
import profileUpload from '../services/profileupload.js'
const userRouter = Router()
import {loginHandler,signUpHandler} from '../controllers/user.js'
userRouter.get('/signin',(req,res)=>res.render("signin",{user:null}))
userRouter.get('/signup',(req,res)=>res.render("signup",{user:null}))
userRouter.post('/signin',loginHandler)
userRouter.post('/signup',profileUpload.single('profilepic'),signUpHandler)

export default userRouter