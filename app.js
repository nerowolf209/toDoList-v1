const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// this is commonly used when accessing css files. 
//app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');

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


