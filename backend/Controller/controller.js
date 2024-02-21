const InfoModel = require('../Model/model');
const mongoose = require('mongoose');

//getWork
const getWork =async (req,res)=>{
    const user_id = req.user._id
    const data = await InfoModel.find({user_id}).sort({createdAt: -1});
    //response
   return res.status(200).json(data)
};

// postWork

const postWork = async (req,res)=>{
    const user_id = req.user._id
    const {title, reps, load} = req.body;
    const emptyField = [];

    if(!title){
        emptyField.push('title')
    }
    if(!reps){
        emptyField.push('reps')
    }

    
    if(emptyField.length > 0){
        const message = {message:'fill in required fields', emptyField}
       return res.status(400).json(message)
    }else{
        try{
            const data = await InfoModel.create({title,reps,load, user_id});
    
            if(data){
              return  res.status(200).json(data)
            }
        }catch(error){
           return res.status(400).json({message:error.message})
        }
        
    }

   
}
//deleteWork 
const deleteWork = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(400).json({message:'doesnt exist'})
    }

    const data = await InfoModel.findByIdAndDelete(id)

    if(!data){
       return res.status(400).json({message:'file doesnt exist'})
    }
  return res.status(200).json(data)
}


//patch work

const patchWork = async(req,res)=>{
   const {id} = req.params;
   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({message:'error'})
   }

const {title, reps, load}= req.body;

const data = await InfoModel.findOneAndUpdate({title,reps,load}, id)
if(!data){
   return res.status(404).json({message:'file not uploaded'})
}
return res.status(200).json(data)
}


module.exports ={
    postWork,
    getWork,
    deleteWork,
    patchWork
}