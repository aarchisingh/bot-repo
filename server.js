
var express = require('express');
var app = express();
var fs = require('fs');
app.use(express.json());
// Endpoint to Get a list of all bots
app.get('/getBots', function(req, res){
    console.log("Hello");
    fs.readFile(__dirname + "/" + "bots.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data);
    });
})
// Endpoint to Get a list of one bots
app.get('/getBot/:id', function (req, res) {
    // First retrieve existing user list
    console.log("HelloID");
    fs.readFile( __dirname + "/" + "bots.json", 'utf8', function (err, data) {
       var bots = JSON.parse( data );
       for (let bot in bots){
           if(bots[bot].id == req.params.id){
            res.end( JSON.stringify(bots[bot]));
           }
       }
       res.end("Bot with ID "+ req.params.id +" not found");
    });
 })
// Endpoint to add a new Bot
 app.post('/addBot', function(req, res){
    var newBot = req.body;
    console.log(newBot);
    let content = JSON.parse(fs.readFileSync(__dirname + "/" + "bots.json", 'utf8'));
    content.push(newBot);
    //write file
    fs.writeFileSync(__dirname + "/" + "bots.json", JSON.stringify(content, null, 2));
    res.end("Bot Created");

})
// Endpoint to update a bot
app.put('/updateBot/:id', function(req, res){
    console.log("PUT");
    var newBot = req.body;
    console.log(newBot);
    let bots = JSON.parse(fs.readFileSync(__dirname + "/" + "bots.json", 'utf8'));
    for (let bot in bots){
        if(bots[bot].id == req.params.id){
            var updated = true;
            console.log("updating...");
            bots[bot] = newBot;
        }
    }

    fs.writeFileSync(__dirname + "/" + "bots.json", JSON.stringify(bots, null, 2));
    if(updated){
        res.end("Bot "+req.params.id+" updated");
    }
    else
    res.end("Bot "+req.params.id+" not found, skipping...");

})
app.delete('/deleteBot/:id', function(req, res){
    console.log("DELETE");
    let bots = JSON.parse(fs.readFileSync(__dirname + "/" + "bots.json", 'utf8'));
    for (let bot in bots){
        if(bots[bot].id == req.params.id){
            var deleted = true;
            console.log("deleting...");
            bots.splice(bot,1) ;
        }
    }

    fs.writeFileSync(__dirname + "/" + "bots.json", JSON.stringify(bots, null, 2));
    if(deleted){
        res.end("Bot "+req.params.id+" deleted");
    }
    else{
        res.end("Bot "+req.params.id+" not found, skipping...");
    }

})
// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})