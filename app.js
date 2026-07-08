import express from 'express';
import uploadRoutes from "./routes/upload.js";
import ConnectDB from './config/ConnectDB.js';
import chatRoutes from './routes/chat.js';
import deleteRoute from './routes/deleteDoc.js'

const app = express();
app.use(express.json());

app.use("/api", uploadRoutes);
app.use("/api", chatRoutes);
app.use("/api", deleteRoute);

try {
    await ConnectDB();

    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
} catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
}