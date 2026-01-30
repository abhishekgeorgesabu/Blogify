const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		salt: {
			type: String,
			required: true,
			default: "salt",
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["USER", "ADMIN"],
			default: "USER",
		},
		profileImageURL: {
			type: String,
			required: false,
			default: "/images/default.jpeg",
		},
	},
	{ timeseries: true },
);

userSchema.pre("save", async function (next) {
	const user = this;

	const salt = randomBytes(16).toString();
	const hashedPassword = createHmac("sha256", salt)
		.update(user.password)
		.digest("hex");

	this.salt = salt;
	this.password = hashedPassword;

	next();
});

const User = model("user", userSchema);

module.exports = User;
