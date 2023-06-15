import blogModeler from "../models/blog.js"
import commentModeler from '../models/comment.js'

//create
const blogAdder = async (req, res) => {
    const userId = await req.user._id
    let newBlog = { title: req.body.title, body: req.body.body, createdBy: userId }
    try {
        if (req.file) {
            const { path } = req.file
            const normalizedFilePath = path.replace(/\\/g, '/');
            newBlog = { ...newBlog, coverImageUrl: normalizedFilePath }
        }
        await blogModeler.create(newBlog)
        return res.redirect('/blog/personal')
    } catch (error) {
        return res.send(error.message)
    }
}

const commentAdder = async (req, res) => {
    const body = req.body.comment
    const createdOn = req.query.blogId
    const createdBy = req.query.commentedBy
    await commentModeler.create({ body, createdBy, createdOn })
    return res.redirect(`/blog/read/${createdOn}`)
}

//read
const allBlogsFetcher = async (req, res) => {
    const blogs = await blogModeler.find({}).populate("createdBy").sort({ createdAt: -1 })
    return res.render('allblogs', { user: req.user, blogs })
}
const personalBlogsFetcher = async (req, res) => {
    const userBlogs = await blogModeler.find({ createdBy: req.user._id }).sort({ createdAt: -1 })
    return res.render('userblogs', { user: req.user, blogs: userBlogs })
}
const blogDisplayer = async (req, res) => {
    const blog = await blogModeler.findById(req.params.id).populate("createdBy")
    if (!blog) return res.redirect('/user/signin')
    let comments = await commentModeler.find({ createdOn: req.params.id }).populate("createdBy")
    comments = comments.map(x => x.toObject())
    return res.render("blog.ejs", { user: req.user, blog, comments })
}

//update
const blogUpdater = async (req, res) => {
    const blogId = req.params.blogId
    const bodyEntries = Object.entries(req.body)
    let updatedContent = {}
    for (let key in bodyEntries) {
        if (bodyEntries[key][1].trim() !== "") {
            updatedContent = { ...updatedContent, [bodyEntries[key][0]]: bodyEntries[key][1] }
        }
    }
    if (req.file) {
        const normalizedFilePath = req.file.path.replace(/\\/g, '/');
        updatedContent = { ...updatedContent, createdBy: req.user._id, coverImageUrl: normalizedFilePath }
    } else {
        updatedContent = { ...updatedContent, createdBy: req.user._id }
    }
    await blogModeler.findByIdAndUpdate(blogId, updatedContent)
    return res.redirect(`/blog/read/${blogId}`)
}
const go2UpdatePage = async (req, res) => {
    const blogId = req.params.blogId
    const blog = await blogModeler.findById(blogId)

    return res.render("updateblog.ejs", { user: req.user, blog })
}
const commentUpdater = async (req, res) => {
    const commentId = req.params.commentId
    const body = req.body.comment
    if (commentId) {
        const updatedComment = await commentModeler.findByIdAndUpdate(commentId, { body }, { new: true })
        return res.redirect(`/blog/read/${updatedComment.createdOn}`)
    }
}

    
const updateLikesBy = async(req,res)=>{
    const {blogId,action} = req.query
    const profileImageUrl = req.user.profileImageUrl
    switch(action){
        case 'add':
            await blogModeler.findByIdAndUpdate(blogId,{$addToSet:{likesBy:{_id:req.user._id,fullName:req.user.fullName,profileImageUrl}}})
            break
        case 'remove':
            await blogModeler.findByIdAndUpdate(blogId,{$pull:{likesBy:{_id:req.user._id,fullName:req.user.fullName,profileImageUrl}}})
            break
        default:
            break
    }
    
    return res.redirect(`/blog/read/${blogId}`)
}

//delete
const blogDeleter = async (req, res) => {
    const blogId = req.params.blogId
    await blogModeler.findByIdAndDelete(blogId)
    return res.redirect('/blog/personal')
}

const commentRemover = async (req, res) => {
    const commentId = req.params.commentId
    if (commentId) {
        const deletedComment = await commentModeler.findByIdAndDelete(commentId)
        return res.redirect(`/blog/read/${deletedComment.createdOn}`)
    }
}
const allCommentsRemover = async (req, res) => {

    const blogId = req.params.blogId
    const comments = await commentModeler.find({ createdOn: blogId })
    for (let key in comments) {
        await commentModeler.findByIdAndDelete(comments[key]._id)
    }
    return res.redirect(`/blog/read/${blogId}`)
}

export { blogAdder, allBlogsFetcher, personalBlogsFetcher, go2UpdatePage, blogUpdater, blogDeleter, blogDisplayer, commentAdder, commentRemover, commentUpdater, allCommentsRemover,updateLikesBy }