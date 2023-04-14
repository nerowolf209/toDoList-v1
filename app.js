const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//this is commonly used when accessing css files. 
app.use(express.static('public'));

app.set('view engine','ejs');

let addList = [];
let workList = [];



app.get("/", function(req,res){

    res.render('list',{listTitle:date.getDate(),list:addList});

});

app.get("/work",function(req,res){

    res.render('list',{listTitle:"Work List",list:workList});
});

app.get("/about",function(req,res){

    res.render('about');
});

app.post("/", function(req, res){
        addList.push(req.body.toDoList);
        res.redirect("/");

});

app.post("/work", function(req, res){
    workList.push(req.body.toDoList);
    res.redirect("/work");
});


app.listen(3000, function(){
    console.log("Server is running.");
});


