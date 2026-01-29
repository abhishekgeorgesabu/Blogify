const { connect } = require("mongoose");

async function connectMongoDB(url) {
	try {
		await connect(url);
		console.log("MongoDB connected succcessfully");
		return;
	} catch (error) {
		console.error(`error: ${error}`);
		return;
	}
}

module.exports = connectMongoDB;
