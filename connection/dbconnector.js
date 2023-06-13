import { connect } from "mongoose"
const dbConnector = (url,dbName)=>{
    connect(`${url}/${dbName}`).then(()=>console.log('Connected to DB Succesfully')).catch(err=>console.log(err.message))
} 
export default dbConnector