import express from 'express'
import cookieParser from 'cookie-parser'
const basicMiddleWares = (app)=>{
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    app.use(cookieParser())
}

export default basicMiddleWares