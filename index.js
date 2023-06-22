import express from 'express'
import path from 'path'
import basicMiddleWares from './middlewares/basic.js'
import basicRouter from './routes/basicroute.js'
import userRouter from './routes/userroute.js'
import dbConnector from './connection/dbconnector.js'
import blogRouter from './routes/blogroute.js'
import { config } from 'dotenv'
import fs from 'fs';

//setting default ProfilePic(for users) and CoverPic(for Blogs)
let defaultProfileInBase64;
let defaultCoverInBase64;
const defaultProfilePath = './images/defaultProfile.png'
const defaultCoverPath = './images/defaultCover.png'
const convertImageInBase64 = async (imgPath) => {
    try {
        // Read the image file
        const data = await fs.promises.readFile(imgPath);
        // Convert the image data to base64
        const base64Image = Buffer.from(data).toString('base64');
        // Store the base64 image in a variable named defaultProfilePic
        return 'data:image/png;base64,' + base64Image;
        //here 'data:image/png;base64,' is meta data for rendering image in frontend
    } catch (err) {
        console.error('Error reading image file:', err);
        return ''
    }
}
const setValue = async () => {
    defaultProfileInBase64 = await convertImageInBase64(defaultProfilePath)
    defaultCoverInBase64 = await convertImageInBase64(defaultCoverPath)
}
setValue()
//.......................................

//main flow of app
config()
const app = express()
const PORT = process.env.PORT
const Mongo_URI = process.env.Mongo_URI

basicMiddleWares(app)
dbConnector(Mongo_URI)
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use(basicRouter)
app.use('/user', userRouter)
app.use('/blog', blogRouter)

app.listen(PORT, () => console.log(`Server Running on PORT:${PORT}...`))

export { defaultProfileInBase64, defaultCoverInBase64 }
