
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const e = require('express');

express = require("express"),
app = express();
var port = process.env.PORT || 3000
//const port = 3000
app.use(express.static(__dirname + '/public'));

app.get("/sayHello", function(req,res){
    var user_name = req.query.user_name
    res.send("hello"+user_name )
})

app.get('/messages', function(req,res){
    retrieveMessage(res)
     
 }) 

app.get('/message' , function(req,res){
    let message = req.query.message
    insertMessage(message)
    res.send("message inserted")
})


// connect to db -- neeeds a db URi
const uri = "mongodb+srv://SIT775software:sit775@sit775.hd36d.mongodb.net/messageboard?retryWrites=true&w=majority"
const client = new MongoClient (uri, {useNewParser:true})

let messageCollection;
const openConnection = (message) =>{
    
    client.connect((err,db) => {
        messageCollection = client.db("sit775").collection("messages")
        if(!err){
        console.log("successful connection to DB")
        }
    })
}
const insertMessage = (message )=>{
    messageCollection.insert({message:message})
}
const retrieveMessage = (res) =>{ 
    messageCollection.find().toArray(function(err,result){
    if (err) throw err;
    res.send(result)
})

}
openConnection()


app.listen(port);
console.log("listening on port "+ port)