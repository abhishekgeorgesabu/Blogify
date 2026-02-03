const { getUser } = require("../services/auth");

function checkAuth(req, res, next) {
	const token = req.cookies?.token;
	if (!token) return next();
	const user = getUser(token);
	if (!user) return next();
	req.user = user;
	return next();
}

module.exports = {
	checkAuth,
};
