const { Router, response } = require("express");
const User = require("../models/user");

const { makeUser } = require("../services/auth");

const router = Router();

// Sign Up

router.get("/signup", (req, res) => {
	return res.render("signup");
});

router.post("/signup", async (req, res) => {
	const { fullName, email, password } = req.body;
	if (!req.body || !fullName || !email || !password) {
		console.log("Enter all fields");
		return res.redirect("/signup");
	}
	let user = await User.findOne({ email });
	if (user) return res.redirect("/");

	user = await User.create({
		fullName,
		email,
		password,
	});

	const token = makeUser(user);

	return res.cookie(token).redirect("/");
});

// Login

router.get("/login", (req, res) => {
	return res.render("login");
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	if (!req.body || !email || !password) {
		console.log("Enter all fields");
		return res.redirect("/login");
	}
	let user = await User.findOne({ email });
	if (!user) return res.send({ msg: "No such user found" });

	const token = makeUser(user);
	return res.cookie(token).redirect("/");
});

module.exports = router;
