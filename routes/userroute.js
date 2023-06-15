import {Router} from 'express'
import validateLogin from '../middlewares/verifyLogin.js'
import profileUpload from '../services/profileupload.js'
const userRouter = Router()
import {loginHandler,signUpHandler,profileDisplayer,profileUpdater} from '../controllers/user.js'
userRouter.get('/signin',(req,res)=>res.render("signin",{user:null}))
userRouter.get('/signup',(req,res)=>res.render("signup",{user:null}))
userRouter.post('/signin',loginHandler)
userRouter.post('/signup',profileUpload.single('profilepic'),signUpHandler)
userRouter.get('/profile',validateLogin,profileDisplayer)
userRouter.post('/profile/edit',validateLogin,profileUpload.single('profilePic'),profileUpdater)

export default userRouter