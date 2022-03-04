const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    //const mongoAtlasUri = process.env.mongoAtlasUri;
    const mongoAtlasUri = "mongodb+srv://admin:admin@birdsnest.0rzqb.mongodb.net/Bird'snest?retryWrites=true&w=majority";
    // Chạy local cho đỡ lag
    //mongoAtlasUri = "mongodb://localhost:27017/Bird'snest";
    try {
        await mongoose.connect(mongoAtlasUri); 
        console.log('connect successfully');
    } catch (err) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
