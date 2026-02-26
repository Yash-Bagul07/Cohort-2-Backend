const express = require("express")

const app = express()

app.get("/", (req,res)=>{
    res.send("Hello World")
})

app.get("/about", function(req,res){
    res.send("This is about page")
})

app.get("/home",function (req,res){
    res.send("This is Home page")
})

app.listen(3000)    