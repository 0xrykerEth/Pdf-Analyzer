import { pdfQueue } from "../queue/pdfQueue.js";
import path from 'path'

async function uploadController(req, res) {

    try {

        if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No PDF uploaded.",
        });
    }


        await pdfQueue.add("process-pdf", {
            filePath: path.resolve(req.file.path),
            fileName: req.file.filename,
            originalName: req.file.originalname
        });

        console.log("Job added");

        return res.status(200).json({success: true, message: "PDF queued for processing"});

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message,
        });

    }
}

export default uploadController;