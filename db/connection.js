const mongoose = require('mongoose');
require("dotenv").config();


main().then(() => console.log('MongoDB connected successfully')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

}

module.exports  = main