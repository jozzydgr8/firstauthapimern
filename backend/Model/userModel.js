const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});


//staticSchema
UserSchema.statics.signup = async function(email, password){
    if(!email || !password){
        throw Error('all fields required')
    }
    if(!validator.isEmail(email)){
        throw Error('invalid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('use stronger password that contains speciall char and ypper case')
    }
    const exist = await this.findOne({email})
    if(exist){
        throw Error('email already exists')
    }
    const Salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,Salt)

    const user = await this.create({email, password:hash})

    return user
}

UserSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error ('all fields required')
    }

    const user = await this.findOne({email});
    if(!user){
        throw Error ('wrong email or password')
    }
    const compare =await bcrypt.compare(password, user.password)
    if(!compare){
        throw Error ('wrong email or password')
    }
    return user
}





//static schema method create
// UserSchema.statics.signup = async function(email, password){


//     if(!email || !password){
//         throw Error('all fields are required')
//     }
//     if(!validator.isEmail(email)){
//         throw Error ('please use a valid email')
//     }
//     if(!validator.isStrongPassword(password)){
//         throw Error('use a stronger password')
//     }
//     const exist = await this.findOne({email})

//     if(exist){
//         throw Error('email already exists')
//     }

//     const Salt = await bcrypt.genSalt(10)
//     const hash = await bcrypt.hash(password, Salt)

//     const user = await this.create({email, password:hash})

//     return user
// }

// UserSchema.statics.login = async function(email,password){
// if(!email || !password){
//     throw Error('all fields required')
// }

//     const user = await this.findOne({email})
//     if(!user){
//         throw Error ('wrong email or password')
//     }
//    const compare = await bcrypt.compare(password, user.password)
//     if(!compare){
//         throw Error('wrong email or password')
//     }
//     return user
// }
const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel