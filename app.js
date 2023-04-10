const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// this is commonly used when accessing css files. 
//app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');

app.get("/", function(req,res){
    
    var today = new Date();
    var currentDay = today.getDay()
    var weekDate = ""
    var text = "";
    if (currentDay === 0 || currentDay === 6){
        weekDate = "weekend";
    } else {
        weekDate = "weekday";
    }
    
    if (currentDay === 0 ){
        text = "Sunday";
    }else if(currentDay=== 1 ){
        text = "Monday";
    }else if(currentDay=== 2 ){
        text = "Tuesday";
    }else if(currentDay=== 3 ){
        text = "Wednesday";
    }else if(currentDay=== 4 ){
        text = "Thursday";
    }else if(currentDay=== 5 ){
        text = "Friday";
    }else if(currentDay=== 6 ){
        text = "Saturday";
    }
    res.render('list',{weekDate:weekDate,userDate:text});

});


app.listen(3000, function(){
    console.log("Server is running.");
});


