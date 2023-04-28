const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose")

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//this is commonly used when accessing css files. 
app.use(express.static('public'));

app.set('view engine','ejs');

dbName = "toDoListDB"


// Mongoose section //

mongoose.connect('mongodb://127.0.0.1:27017/'+ dbName);

const itemsSchema = ({
    name: String
});


const Item = mongoose.model("Item", itemsSchema);

function createEntry(itemName){
    const item = new Item({
        name: itemName,
    });
    
    item.save();
}

function exitMongoose(){
    mongoose.connection.close()
}

// This section is to add the default values into DB


const item1 = new Item({
    name: "Welcome to your todo List",
});

const item2 = new Item({
    name: "Hit the + button to add a new item",
});

const item3 = new Item({
    name: "<-- Hit this to delete an item",
});

const defaultArray = [item1,item2,item3]


// EJS and application section

app.get("/", function(req,res){
    
    Item.find()
    .then(items => {
        if (items.length === 0){
            Item.insertMany(defaultArray)
            .then(() => {
                console.log("Insert Success");
            })
            .catch((err) => {
                console.log(err);
            });
            res.redirect('/');
        }else {
            res.render('list',{listTitle:date.getDate(),list:items});
        }

        
    })
    .catch(err => {
        console.log(err)
    })
    

});

app.get("/:customListName", function(req,res){
    console.log(req.params.customListName)
});


app.post("/", function(req, res){
    createEntry(req.body.toDoList)
    res.redirect("/");

});

app.post("/delete", function(req,res){
    console.log(req.body.checkBox)
    Item.findByIdAndRemove(req.body.checkBox)
        .then(() => {
            console.log("delete successful")
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
            res.redirect('/')
        });
    
});

app.get("/about",function(req,res){

    res.render('about');
});



// app.post("/work", function(req, res){
//     workList.push(req.body.toDoList);
//     res.redirect("/work");
// });


app.listen(3000, function(){
    console.log("Server is running.");
});


