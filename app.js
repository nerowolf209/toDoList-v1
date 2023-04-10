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

    switch (currentDay) {
        case 0:
            text = "Sunday";
            break;
        case 1:
            text = "Monday";
            break;
        case 2:
            text = "Tuesday";
            break;
        case 3:
            text = "Wednesday";
            break;
        case 4:
            text = "Thursday";
            break;
        case 5:
            text = "Friday";
            break;
        case 6:
            text = "Saturday";
            break;
        default:
            console.log("Error: currentDay is equal to: " + currentDay);
            break;
    }

    res.render('list',{weekDate:weekDate,userDate:text});

});


app.listen(3000, function(){
    console.log("Server is running.");
});


