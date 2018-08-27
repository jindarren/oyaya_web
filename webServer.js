"use strict";

var mongoose = require('mongoose');
var async = require('async');


// Load the Mongoose schema for User, Photo, and SchemaInfo
var FormData = require('./schema/userData.js');

var express = require('express');
var app = express();

//Modules
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require("fs");
// var router = express.Router();

app.use(session({secret: 'secretKey', resave: false, saveUninitialized: false}));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) {
        console.log("connection error", err);

    } else {
        console.log('connection successful!');
    }
});

app.listen(3002);

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));
//app.use(express.static('./'))


app.get('/', function (request, response) {
    //response.send('Simple web server of files from ' + __dirname);
    response.redirect('webpage.html');
});

// app.get('/submitForm', function(request, response) {
// 	FormData.create({client_name:request.body.client_name, city:request.body.city, contact_info:request.body.contact_info,
// 		div_track:request.body.div_track, btn_track: request.body.btn_track});
//     response.send("User added");
// });

app.get("/getStat", function(req, res){
    FormData.find({},function (err, user) {
        if (err)
            res.send(err);
        else{

            // var result = user[user.length-1].div_track.size

            // res.json({"div":result})
            res.json(user)
        }
    })
});

app.post("/submitForm", function(req, res){
	var user = new FormData({
        session_time: req.body.session_time,
        session_id: req.body.session_id,
	    client_name:req.body.client_name, 
	    city:req.body.city,
	    contact_info:req.body.contact_info,
		div_track:req.body.div_track, 
		btn_track:req.body.btn_track
	});

    user.save(function (err) {
        if (err)
            res.send(err);
        // res.json({message: "user profile is updated"})
        res.json(user)
    })
});
