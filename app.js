const express = require("express");
const connectMongoDb = require("./connection");

connectMongoDb("mongodb://127.0.0.1:27017/Blogify");
const app = express();

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server started at PORt ${PORT}`);
});
