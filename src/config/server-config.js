const dotenv=require('dotenv');
const path = require('path');

dotenv.config({path:path.join(__dirname,'../../.env')}); 

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUNDS:process.env.SALT_ROUNDS,
    JWT_EXPIRY:process.env.JWT_EXPIRY,
    JWT_SECRET:process.env.JWT_SECRET
}