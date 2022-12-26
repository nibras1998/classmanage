const mongoose = require("mongoose")

const studentsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    classid:{
        type:String,
        
    },
    studentid:{
        type:Number,
        unique:true
    }
},{
    collection:"studentsInfo"
})

module.exports = mongoose.model("studentsInfo",studentsSchema)