const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// this is commonly used when accessing css files. 
//app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');

var addList = []

var today = new Date();

const localLang = 'en-US'
const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
}
var currentDay = today.toLocaleDateString(localLang,options);

app.get("/", function(req,res){

    res.render('list',{weekDate:currentDay,list:addList});

});

app.post("/", function(req, res){
    addList.push(req.body.addList);
    res.redirect("/")
});

app.listen(3000, function(){
    console.log("Server is running.");
});


