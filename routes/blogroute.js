import { Router } from 'express'
const blogRouter = Router()

import { blogAdder, allBlogsFetcher, personalBlogsFetcher, go2UpdatePage, blogUpdater, blogDeleter, blogDisplayer, commentAdder, commentRemover ,commentUpdater,allCommentsRemover,updateLikesBy} from '../controllers/blog.js'

import validateLogin from '../middlewares/verifyLogin.js'


//create
blogRouter.post('/add', validateLogin, blogAdder)
blogRouter.get('/add', validateLogin, (req, res) => res.render("addblog.ejs", { user: req.user }))
blogRouter.post('/comment', validateLogin, commentAdder)

//read
blogRouter.get('/all', validateLogin, allBlogsFetcher)
blogRouter.get('/personal', validateLogin, personalBlogsFetcher)
blogRouter.get('/read/:id', validateLogin, blogDisplayer)

//update
blogRouter.get('/update/:blogId', validateLogin, go2UpdatePage)
blogRouter.post('/update/:blogId', validateLogin, blogUpdater)
blogRouter.post('/comment/update/:commentId',validateLogin,commentUpdater)
blogRouter.get('/updatelikesBy',validateLogin,updateLikesBy)

//delete
blogRouter.get('/delete/:blogId', validateLogin, blogDeleter)
blogRouter.get('/comment/delete/:commentId', validateLogin, commentRemover)
blogRouter.get('/comment/removeall/:blogId', validateLogin, allCommentsRemover)

export default blogRouter