const { getUser } = require("../services/auth");

const role = ["ADMIN", "USER"];

function checkAuth(req, res, next) {
	const token = req.cookies?.token;
	if (!token) return next();
	const user = getUser(token);
	if (!user) return next();
	req.user = user;
	return next();
}

function restrictTo(roles) {
	return function (req, res, next) {
		if (!req.user) return res.redirect("/user/login");
		if (!roles.includes(req.user.role)) return res.end("Unauthorized");
		next();
	};
}

module.exports = {
	checkAuth,
	restrictTo,
};
