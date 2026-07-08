import { askQuestion } from "../services/askQuestion.js";

async function chatController(req, res) {

    try {

        const { question, documentId } = req.body;

        const answer = await askQuestion(question,documentId);

        return res.json({
            answer,
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message,
        });

    }

}

export default chatController;