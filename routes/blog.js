const { Router } = require("express");
const User = require("../models/user");
const Blog = require("../models/blog");

const router = Router();

router.post("/", async (req, res) => {
	const { content } = req.body;
	const user = req.user;
	await Blog.create({
		content,
		createdBy: user,
	});
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const blog = Blog.find({ id: id });
	if (!blog) return res.status(404).send({ error: "Blog not found" });
	const { _id, content, time } = blog;
	return res
		.send({
			_id,
			content,
			time,
		})
		.status(200);
});
