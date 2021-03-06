import express from 'express';
import Guid from 'guid';
import * as util from 'util';
import * as _ from "./Utils";
import multer from 'multer';

// Files uploaded will be stored on disk
const upload = multer({
	storage: multer.diskStorage({
		destination: "uploads/",
		filename: function (req, file, cb) {
			cb(null, "F_" + Date.now() + "_" + file.originalname.replace(/\s+/g, "_"))
		}
	})
});

let route = new express.Router();
let sampleUserId = Guid.create();

route.post('/login', function (req, res) {

	var q = util._extend({}, req.body);
	let { email, password } = q;

    console.log("User logged in:");
    console.log("   - email: " + email);
    console.log("   - password: " + password);

	res.json({ status: "success", user_id: sampleUserId, name: "Fake User", is_confirmed: false});
});

route.post('/signup', upload.single('photo'), function (req, res) {

	var q = util._extend({}, req.body);
	let { email, name, password, birthdate, location, gender, phone, address } = q;
	let photo = req.file;
	let photo_url = (photo) ? photo.path : null;

	console.log("Signup new user:")
	console.log("  - email:" + email)
	console.log("  - name:" + name)
	console.log("  - password:" + password)
	console.log("  - phone:" + phone)
	console.log("  - birthdate:" + birthdate)
	console.log("  - location:" + location)
	console.log("  - gender:" + gender)
	console.log("  - address:" + address)
	console.log("  - photo:" + photo_url)

	res.json({ status: "success", user_id: sampleUserId, photo_url });
});

route.post('/confirm', function (req, res) {

	var q = util._extend({}, req.body);
	let { userID, code } = q;

	console.log("Received confirmation code: " + code)
	console.log("  - for user: " + userID)
	res.json({ status: "success" });
});

route.post('/sendconfirmcode', function (req, res) {

	var q = util._extend({}, req.body);
	let { userID } = q;

	console.log("Resend confirmation code for user: " + userID)
	res.json({ status: "success" });
});

route.post('/forgotpassword', function (req, res) {

	var q = util._extend({}, req.body);
	let { email } = q;

	console.log("Forgot password reported for email: " + email)
	res.json({ status: "success" });
});

export default route;

/* 
 * Extras
 * 

// Sample of GET endpoint
router.get('/sayHello', function (req, res) {

	var q = util._extend({}, req.query);
	let { to } = q;
	to = (to) ? to : "World";

	res.send(`Hello, ${to} !`);
});

// Sample of POST endpoint that handles "x-www-form-urlencoded" body, look like this
router.post('/sayHello', function (req, res) {

	var q = util._extend({}, req.body);
    let { to } = q;
    
	res.send(`Hello, ${to} !`);
});

// In case you're dealing with "multipart/form-data" body, use the following:
router.post('/testing-parts', upload.array(), function (req, res) {

	var q = util._extend({}, req.body);
	let { something } = q;
	let success = (something) ? true : false;

	res.json({ success, testing: something });
});


// In case you're expecting file uploads, use the following command
// to state that:
//      upload.any()                 --> Expecting files in any field
//      upload.single('avatar')      --> Expecting file in field 'avatar'
//      upload.array('photos', 12)   --> Expecting array of files for field 'photos'
router.post('/upload', upload.any(), function (req, res) {

	// Access files 
	console.log(req.files);

	res.json({ success: true });
});

*/
