const jwt = require("jsonwebtoken");

const secret = "secret";

function makeUser(body) {
	{
		(_id, fullName, email);
	}
	const token = jwt.sign(
		{
			_id,
			fullName,
			email,
			role: "USER",
		},
		secret,
	);

	return token;
}

module.exports = {
	makeUser,
};
