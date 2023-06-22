import {Router} from 'express'
import validateLogin from '../middlewares/verifyLogin.js'

const userRouter = Router()
import {loginHandler,signUpHandler,profileDisplayer,profileUpdater} from '../controllers/user.js'
userRouter.get('/signin',(req,res)=>res.render("signin",{user:null}))
userRouter.get('/signup',(req,res)=>res.render("signup",{user:null}))
userRouter.post('/signin',loginHandler)
userRouter.post('/signup',signUpHandler)
userRouter.get('/profile',validateLogin,profileDisplayer)
userRouter.post('/profile/edit',validateLogin,profileUpdater)

export default userRouter