const UserModel = require('../Model/userModel');
const jwt = require('jsonwebtoken');


const createToken = (_id)=>{
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

//signin
const logIn = async(req,res)=>{
    const {email,password} = req.body;

    try{
        const user =await UserModel.login(email, password)
        const token = await createToken(user._id)

        return res.status(200).json({email, token})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//sign up
const signUp = async(req,res)=>{
    const {email, password} = req.body
    try{
        const user = await UserModel.signup(email,password);
        
        const token = await createToken(user._id);

            return res.status(200).json({email, token})
        
    }catch(error){
       return res.status(400).json({error:error.message})
    }
}


module.exports={
    logIn,
    signUp
}