import userModeler from "../models/user.js"
import { generateToken } from '../services/authentication.js'
import {defaultProfileInBase64} from '../index.js'

const loginHandler = async (req, res) => {
    const receivedToken = req.cookies["token"]
    if (!receivedToken) {
        const { email, password } = req.body
        try {
            const fetchUserIfPasswordVerified = await userModeler.passwordVerifier(email, password)
            const token = await generateToken(fetchUserIfPasswordVerified.toObject())
            return res.cookie("token", token).redirect(`/blog/all`)
        } catch (error) {
            return res.send(error.message)
        }
    } else {
        return res.redirect(`/blog/all`)
    }
}

const signUpHandler = async (req, res) => {
    let profilepic = req.body.profilepic
    if (!profilepic || profilepic === '') {
        profilepic = await defaultProfileInBase64
    }
    try {
        const { email, fullName, password, about } = req.body
        const data = { email, fullName, password, about, profilepic }
        await userModeler.create(data)
        return res.redirect('/')
    } catch (error) {
        console.log(error.message)
        return res.redirect('/user/signup')
    }
}

const profileDisplayer = async (req, res) => {
    return res.render("profile", { user: req.user })
}
const profileUpdater = async (req, res) => {
    const bodyEntries = Object.entries(req.body)
    let data = {}
    for (let key in bodyEntries) {
        if (bodyEntries[key][1].trim() !== "") {
            data = { ...data, [bodyEntries[key][0]]: bodyEntries[key][1] }
        }
    }
    await userModeler.findByIdAndUpdate(req.user._id, data)
    return res.redirect('/user/profile')
}
export { loginHandler, signUpHandler, profileDisplayer, profileUpdater }