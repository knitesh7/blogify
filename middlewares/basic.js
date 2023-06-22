import express from 'express'
import cookieParser from 'cookie-parser'
const basicMiddleWares = (app) => {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(cookieParser())
}

export default basicMiddleWares