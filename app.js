const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//this is commonly used when accessing css files. 
app.use(express.static('public'));

app.set('view engine','ejs');

let addList = []

let today = new Date();

const localLang = 'en-US'
const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
}
let currentDay = today.toLocaleDateString(localLang,options);

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


