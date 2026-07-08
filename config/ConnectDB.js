import mongoose from "mongoose";
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const uri = 'mongodb+srv://username:pass@cluster0.m17rjaw.mongodb.net/rag?retryWrites=true&w=majority';

const ConnectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected");
        return mongoose.connection;
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};

export default ConnectDB;