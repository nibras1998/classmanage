const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { restart } = require("nodemon")
const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(5000,()=>{
    console.log("Server started on port 5000")
})

mongoose.connect("mongodb://localhost:27017/10xManagement",()=>{
    console.log("Connected to Database")
})

require("./models/class")
require("./models/students")
const Student = mongoose.model("studentsInfo")
const Class = mongoose.model("classInfo")

app.post("/v1/myClass",async(req,res)=>{
    let id = Date.now()
    let classnum = req.body.class
    let studentscount = req.body.studentscount
    try{
        await Class.create({
            id:id,
            class:classnum,
            studentscount:studentscount
        },(err,docs)=>{
            if(!err){
                res.json({id:id})
            }else{
                res.send("An error occured")
            }
        })
    }
    catch(e){
        console.log(e)
    }
})

app.post("/v1/myClass/:myClassId/students",async(req,res)=>{
    let name = req.body.name
    let classid = req.params.myClassId
    let studentid  = Date.now()+1
    try{
    await Student.create({
        name:name,
        classid:classid,
        studentid:studentid
    },(err,docs)=>{
        if(!err){
            res.json({studentid:studentid}).status(201)
        }else{
            console.log(err)
            res.send("An error occured")
            
        }
    })
    }
    catch(e){
        console.log(e)
    }
})

app.get("/v1/myClass",async(req,res)=>{
    try{
       let classes =  await Class.find({})
       res.json(classes)
    }catch(e){
        console.log(e)
    }
})

app.get("/v1/myClass/:myClassId",async(req,res)=>{
    let id = req.params.myClassId
    try{
        let classid = await Class.findById({_id:id})
        if(!classid){
            res.send("There is no class at that id").status(404)
        }else{
            res.json(classid)
        }
       
    }catch(e){
        console.log(e)
    }
})

app.get("/v1/myClass/:myClassId/students",async(req,res)=>{
    let classid=req.params.myClassId
    try{
        let student = await Student.findOne({classid:classid})
        
        if(!student){
            res.send("There are no students at this class").status(404)
        }else{
            res.json(student)
        }
    }catch(e){
        console.log(e)
    }
})

app.get("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    let classid = req.params.myClassId
    let studentid = req.params.studentId
    try{
        let student = await Student.findOne({classid:classid,studentid:studentid})
        if(!student){
            res.send("There is no student of that id")
        }else{
            res.json(student)
        }
    }catch(e){
        console.log(e)
    }
})

app.put("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    let classid = req.params.myClassId
    let studentid = req.params.studentId
    let name = req.body.name
    try{
       let student =  await Student.findOneAndUpdate({classid:classid,studentid:studentid},{name:name})
       if(!student){
        res.send("No student at that id")
       }else{
        res.status(204).send("Updated")
       }
       
    }catch(e){
        console.log(e)
    }
})

app.delete("/v1/myClass/:myClassId",async(req,res)=>{
    let id = req.params.myClassId
    try{
        let deleted = await Class.findByIdAndDelete({_id:id})
        if(!deleted){
            res.send("No student at that id")
        }else{
            res.send("Deleted").status(204)
        }
    }catch(e){
        console.log(e)
    }
})

app.delete("/v1/myClass/:myClassId/students/:studentId",async(req,res)=>{
    let classid = req.params.myClassId
    let studentid = req.params.studentId
    try{
        let deleted = await Student.findOneAndDelete({classid:classid,studentid:studentid})
        if(!deleted){
            res.send("No student at that id")
        }else{
            res.send("Deleted").status(204)
        }
    }catch(e){
        console.log(e)
    }
})