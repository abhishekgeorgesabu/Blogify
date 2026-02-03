const jwt = require("jsonwebtoken");

const secret = "secret";

function makeUser(user) {
	const token = jwt.sign(
		{
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
			role: user.role,
		},
		secret,
	);

	return token;
}

function getUser(cookie) {
	try {
		const user = jwt.verify(cookie, secret);
		return user;
	} catch (err) {
		return null;
	}
}

module.exports = {
	makeUser,
	getUser,
};
