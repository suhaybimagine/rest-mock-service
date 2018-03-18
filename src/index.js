import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import busyboy from 'connect-busboy';
import path from 'path';
import multer from 'multer';
import route from './app-service';

// Files uploaded will be stored on disk
const upload = multer({
	storage: multer.diskStorage({
		destination: "uploads/",
		filename: function (req, file, cb) {
			cb(null, "F_" + Date.now() + "_" + file.originalname.replace(/\s+/g, "_"))
		}
	})
});

// In case you need to store them in memory as buffers, use the following:
//const storage = multer.memoryStorage()
//const upload = multer({ storage }) 

let app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, '../public')));
app.use(busyboy());
app.use(bodyParser.json({ limit: '5mb' })); //Parses raw body as JSON
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use('/', route);
app.listen(app.get('port'), function () {
	console.log('Mock server is running on port', app.get('port'))
});

export default app;



