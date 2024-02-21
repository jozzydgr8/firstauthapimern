const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true,
        validate:{
            validator: (value)=>{
                return !isNaN(value)
            },
            message:'this field takes number'
        }
    },
    load:{
        type:Number,
        required: false,
        default: 0,
        validate: {
            validator: (value)=>{
                return !isNaN(value)
            },
            message: 'value must be a number'
        }
    },
    user_id:{
        type:String,
        required:true
    }
}, {timestamps: true})


const InfoModel = mongoose.model('info', InfoSchema);

module.exports = InfoModel