const mongoose = require('mongoose');

exports.connectDB = async (req, res) => {
    try {
        mongoose.set('strictQuery', true);
        const connect = await mongoose.connect(process.env.DB_CONNECTION);
        console.log('Database connected', connect.connection.host, connect.connection.name);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}