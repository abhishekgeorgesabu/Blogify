const express = require("express");
const path = require("path");
const connectMongoDb = require("./connection");
const cookieParser = require("cookie-parser");

connectMongoDb("mongodb://127.0.0.1:27017/blogify");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const Blog = require("./models/blog");
const { checkAuth, restrictTo } = require("./middleware/auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(checkAuth);

app.get("/", async (req, res) => {
	const allBlogs = await Blog.find({});
	return res.render("homepage", {
		blogs: allBlogs,
	});
});

app.use("/user", userRoute);
app.use("/blog", restrictTo("USER"), blogRoute);

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server started at PORt ${PORT}`);
});
