import {Schema,model} from "mongoose";
import {createHmac,randomBytes} from "crypto"

const userSchema = Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        default:'images/defaultProfile.png'
    },
    role:{
        type:String,
        enum:['ADMIN','USER'],
        default:'USER'
    },
    about:{
      type:String
    }
},{timestamps:true})

userSchema.pre('save',function(next){
    console.log(this.password)
    const user = this
    if(!user.isModified('password')) return
    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac("sha256",salt).update(user.password).digest("hex")
    this.password = hashedPassword
    this.salt = salt
    next() 
})

userSchema.statics.passwordVerifier = async function(email, password) {
    const fetchedUser = await this.findOne({ email });
  
    if (!fetchedUser) {
      throw new Error('No such user found!');
    }
  
    const { salt } = fetchedUser;
  
    if (!salt) {
      throw new Error('Salt not found!');
    }
  
    const newHashPass = createHmac('sha256', salt).update(password).digest('hex');
  
    if (newHashPass === fetchedUser.password) {
      return fetchedUser;
    } else {
      throw new Error('Incorrect Password');
    }
  };

const userModeler = model('users',userSchema)

export default userModeler