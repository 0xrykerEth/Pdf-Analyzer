import express from 'express'
import { documentController } from '../controllers/documentController.js';

const router = express.Router();

router.delete('/delete/:id',documentController)

export default router;