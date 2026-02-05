const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
	{
		coverImageURL: {
			type: String,
			required: false,
			default: "/images/default.jpeg",
		},
		title: {
			type: String,
			required: false,
		},
		content: {
			type: String,
			required: true,
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "users",
		},
	},
	{ timestamps: true },
);

const Blog = model("blog", blogSchema);

module.exports = Blog;
