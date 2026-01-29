const express = require("express");
const path = require("path");
const connectMongoDb = require("./connection");

connectMongoDb("mongodb://127.0.0.1:27017/Blogify");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
	return res.render("homepage");
});

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server started at PORt ${PORT}`);
});
