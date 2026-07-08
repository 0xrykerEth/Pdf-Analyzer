import express from "express";
import multer from "multer";
import storage from "../multer.js";
import uploadController from "../controllers/uploadController.js";

const router = express.Router();

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Only PDF files are allowed."));
        }

        cb(null, true);
    }
});

router.post("/upload", upload.single("pdf"), uploadController);

export default router;