const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// this is commonly used when accessing css files. 
//app.use(express.static('public'));

// This is required to use the bodyParser for HTML sites
app.use(bodyParser.urlencoded({ extended: true }));

/*Express reminder if you are wanting to add multiple lines or
changes when you have a res.send(), make sure you use
res.write() as many times as you need, as you can only have 
on res.send()*/


app.get("/", function(req,res){
    
    var today = new Date();
    var text = "";
    if (today.getDay() === 6 || today.getDay() === 0){
        text = "It is currently the weekend.";
    }else{
        text = "It is currently a weekday.";
    }
    res.send(text);

});


app.listen(3000, function(){
    console.log("Server is running.");
});


