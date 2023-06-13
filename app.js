import express from 'express'
import path from 'path'
import basicMiddleWares from './middlewares/basic.js'
import basicRouter from './routes/basicroute.js'
import userRouter from './routes/userroute.js'
import dbConnector from './connection/dbconnector.js'
import blogRouter from './routes/blogroute.js'
import { config } from 'dotenv'
config()
const app = express()
const PORT = process.env.PORT || 7002
const Mongo_URI = process.env.Mongo_URI
const databaseName = 'blogify'
basicMiddleWares(app)
dbConnector(Mongo_URI,databaseName)
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))
app.use('/images',express.static(path.resolve('./images/')))
app.use('/public',express.static(path.resolve('./public')))
app.use(basicRouter)
app.use('/user',userRouter)
app.use('/blog',blogRouter)

app.listen(PORT, () => console.log(`Server Running on PORT:${PORT}...`))
