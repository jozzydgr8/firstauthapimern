const jwt = require('jsonwebtoken');
const UserModel = require('../Model/userModel')
const reqAuth = async (req, res, next)=>{
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(400).json({error:'authorization token required'})
    }

    const token = authorization.split(' ')[1];


    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await UserModel.findOne({_id}).select('_id')
        next();
    }catch(error){
        console.log(error)
         res.status(401).json({error:'request is not authorized'})
    }

}

module.exports = reqAuth