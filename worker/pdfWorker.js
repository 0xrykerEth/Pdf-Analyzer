import { Worker  } from "bullmq";
import {Redis} from "ioredis";
import Document from "../models/Document.js";
import { ingestPdf } from "../services/ingestPdf.js";
import ConnectDB from "../config/ConnectDB.js";
import fs from "fs/promises";

ConnectDB();

const connection = new Redis({
    port: 6379,
    maxRetriesPerRequest: null
});

const worker = new Worker("pdf-processing",
    async(job) =>{
        const { filePath, originalName } = job.data;
        let document;
        try{
              document = await Document.create({
                title: originalName,
                status: "processing",
                totalPages: 0,
                totalChunks: 0
            });
            
            const result = await ingestPdf(
                filePath,
                document._id,
                document.title
            );

            try {
                await fs.unlink(filePath);
            } catch (err) {
                console.error("Failed to delete uploaded PDF:", err);
            }
                
            document.totalPages = result.totalPages;
            document.totalChunks = result.totalChunks;
            document.status = "completed";
                
            await document.save();

            console.log('Uploaded Successfully')

        }catch(err){
            if (document) {
            document.status = "failed";
            await document.save();
        }

            throw err;
        }

    },
    {connection}
)

worker.on("ready", () => {
    console.log("Worker Ready");
});

worker.on("completed", (job) => {
    console.log("Completed:", job.id);
});

worker.on("failed", (job, err) => {
    console.log("Failed:", err);
});

worker.on("error", (err) => {
    console.log(err);
});