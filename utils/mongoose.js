const mongoose = require("mongoose")
// mongoose.set("strictQuery", false)

function connectDB(app, port, db) {
    mongoose.connect(db)
        .then(() => {
            app.listen(port, () => {
                console.log(`Connected and listening on port: http://localhost:${port}`)
            })
        })
}

async function connectCrudDB(DB) {
    try {
        await mongoose.connect(DB);
        console.log('CrudDB MongoDB connected');
    } catch (error) {
        console.error('Error connecting to update MongoDB:', error);
        process.exit(1);
    }
};

async function disconnectDB() {
    mongoose.disconnect()
        .then(() => {
            console.log('Disconnected from MongoDB');
        })
        .catch((err) => {
            console.error('Error disconnecting from MongoDB:', err);
        });
}

module.exports = {
    connectDB,
    connectCrudDB,
    disconnectDB
}
