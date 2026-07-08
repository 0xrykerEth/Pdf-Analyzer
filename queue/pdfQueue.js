import { Queue } from "bullmq";
import {Redis} from 'ioredis'

const connection = new Redis({
     maxRetriesPerRequest: null
})

export const pdfQueue = new Queue("pdf-processing", {
    connection
});

