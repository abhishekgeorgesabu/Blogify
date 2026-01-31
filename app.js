const express = require("express");
const path = require("path");
const connectMongoDb = require("./connection");
const cookieParser = require("cookie-parser");

connectMongoDb("mongodb://127.0.0.1:27017/blogify");

const userRoute = require("./routes/user");
const { checkAuth } = require("./middleware/auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(checkAuth);

app.get("/", (req, res) => {
	return res.render("homepage");
});

app.use("/user", userRoute);

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server started at PORt ${PORT}`);
});
