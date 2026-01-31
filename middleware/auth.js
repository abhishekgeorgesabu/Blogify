function checkAuth(req, res, next) {
	const token = req.cookies?.token;
	if (!token) return next();

	req.user = token;
	return next();
}

module.exports = {
	checkAuth,
};
