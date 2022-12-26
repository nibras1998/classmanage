const mongoose = require("mongoose")

const classSchema = new mongoose.Schema({
    id:{
        type:Number,
        unique:true,
        required:true,
    },
    class:{
        type:String,
        required:true
    },
    studentscount:{
        type:Number,
        required:true
    }
},{
    collection:"classInfo"
})

module.exports = mongoose.model("classInfo",classSchema)