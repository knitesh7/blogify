import { connect } from "mongoose"
const dbConnector = (url)=>{
    connect(`${url}`).then(()=>console.log('Connected to DB Succesfully')).catch(err=>console.log(err.message))
} 
export default dbConnector