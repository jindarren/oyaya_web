"use strict";

/**
Schema to store user data in database
**/

var mongoose = require('mongoose');

var formSchema = new mongoose.Schema({
	session_time: String,
	session_id: String,
	client_name: String,
	city: String,
	contact_method: String,
	contact_info: String,
	div_track: {},
	btn_track: {}
});

var FormData = mongoose.model('user3', formSchema);
module.exports = FormData;