const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose")
const _ = require("lodash")
//require('dotenv').config({path: __dirname + '/.env'})

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//this is commonly used when accessing css files. 
app.use(express.static('public'));

app.set('view engine','ejs');

dbName = "toDoListDB"
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;
const uri = "mongodb+srv://"+dbUser+":"+dbPassword+"@todolistcluster.wbzvvrw.mongodb.net/"+dbName+"?retryWrites=true&w=majority"

const client = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    w: 'majority',
    wtimeoutMS: 1000,
    retryWrites: true,
  };




// Mongoose section //
// Local host
//mongoose.connect('mongodb://127.0.0.1:27017/'+ dbName);

mongoose.connect(uri,client);

const itemsSchema = ({
    name: String
});


const Item = mongoose.model("Item", itemsSchema);

async function createEntry(itemName,submitListName=""){
    console.log(itemName);
    console.log(submitListName);

    const item = new Item({
        name: itemName
    });
    try {
        const listName = await List.findOne({ name: submitListName });
    
        if(listName){
            listName.items.push(item);
            console.log("newItem added to customList");
            await listName.save();
            return submitListName;
        }else{
            await item.save();
            console.log("newItem added to mainlist");
            return "";
        }
        } catch (err) {
            console.log(err);
        }
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


// This is creating a new schema for custom lists

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

function createList(listName,res){
    List.find({name:listName})
    .then(listsName => {
        if (listsName.length === 0){
            const newlist = new List({
                name: listName,
                items: defaultArray
            })
            newlist.save();
            console.log("new List created")
            res.redirect('/')
        }
        else{
                res.render('list',{listTitle:listName.name,list:listName.items});
        }
    })
    .catch((err) => {
        console.log(err)
        
        
    })
    
    
    
}

function exitMongoose(){
    mongoose.connection.close()
}

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

app.get("/:customListName", async function(req,res){
    const customList = _.capitalize(req.params.customListName)
    //createList(req.params.customListName,res)
    if (customList != "Favicon.ico") {
        try {
          const listName = await List.findOne({ name: customList });
          if (listName === null) {
            const newlist = new List({
              name: customList,
              items: defaultArray
            })
            await newlist.save();
            console.log("new List created")
            res.redirect('/' + customList)
          } else {
            res.render('list', { listTitle: listName.name, list: listName.items });
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        res.redirect('/')
      }
});


app.post("/", async function(req, res){
    const redirectName = await createEntry(req.body.toDoList,req.body.list)
    console.log(redirectName)
    
    res.redirect("/" + redirectName);

});

app.post("/delete", function(req,res){
    console.log(req.body.checkBox)
    console.log(req.body.listName)
    List.findOne({name:req.body.listName})
    .then(listName => {
        if(listName === null){
            Item.findByIdAndRemove(req.body.checkBox)
        .then(() => {
            console.log("delete successful")
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
            res.redirect('/')
        });
        }else{
            listName.items.splice(listName.items.indexOf(req.body.checkBox));
            listName.save()
            res.redirect('/' + listName.name)
        }
    })
});

app.get("/about",function(req,res){

    res.render('about');
});



// app.post("/work", function(req, res){
//     workList.push(req.body.toDoList);
//     res.redirect("/work");
// });


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running.");
});


