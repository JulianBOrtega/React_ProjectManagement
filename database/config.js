const mongoose = require('mongoose');

const connectDB = async () =>
{
    try 
    {
        const connection = await mongoose.connect(process.env.DB_CONNECTION);
        const url = `${connection.connection.host}:${connection.connection.port}`

        console.log(`-- Succesful connection to DB. (url: ${url})`)
    } 
    catch (error) {
        console.log(`-- MongoDB error: ${error.message}`)
    }
}

module.exports = connectDB