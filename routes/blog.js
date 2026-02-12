const multer = require("multer");
const { Router } = require("express");

const User = require("../models/user");
const Blog = require("../models/blog");

const router = Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/uploads");
	},
	filename: function (req, file, cb) {
		const filename = file.originalname + "-" + Date.now();
		cb(null, filename);
	},
});

const upload = multer({ dest: "uploads/" });

router.post("/", async (req, res) => {
	const { title, content } = req.body;
	const coverImage = req.file;
	const user = req.user;
	await Blog.create({
		title,
		content,
		createdBy: user,
	});
	console.log("Blog created successfully");
	return res.redirect("/");
});

router.get("/:id", async (req, res) => {
	const blogId = req.params.id;
	const blog = await Blog.findOne({ _id: blogId });

	if (!blog) return res.status(404).send({ error: "Blog not found" });
	const { content, createdAt, createdBy } = blog;
	const user = await User.findOne({ _id: createdBy });
	console.log(user);
	return res
		.send({
			blogId,
			content,
			createdAt,
			createdBy: user.fullName,
		})
		.status(200);
});

module.exports = router;
