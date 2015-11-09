/**
 * Created by Thomas on 11/8/15.
 */
var express = require("express");
var app = express();

var path = require("path");
var bodyParser = require("body-parser");

app.set("port", process.env.PORT || 5000);

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/Message_Center';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));



//GET name and message from the client side
app.get('/data', function(req, res){
    var results = [];

    // SQL Query SELECT data from table
    pg.connect(connectionString, function (err, client) {
        var query = client.query("SELECT * FROM message_board ORDER BY name ASC");   //<-----  make sure this command connects to DB

        //stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        //after all data is returned, lcose connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        //handle Errors
        if (err) {
            console.log(err);
        }

    });
});

app.post('/data', function(req, res){
    var addedPerson = {
        "name": req.body.addName,
        "message": req.body.addMessage
    };

    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO message_board (name, message) VALUES ($1, $2) RETURNING id",
            [addedPerson.name, addedPerson.message], function(err, result){
                if(err) {
                    console.log("error with inserting data", err);
                    res.send(false);
                }

                res.send(true);
            });
    });

});


app.get("/*", function(req, res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));

});



app.listen(app.get("port"), function(){
    console.log("listening in port", app.get("port"));
});

