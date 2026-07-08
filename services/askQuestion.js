import mongoose from "mongoose";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OllamaEmbeddings, ChatOllama } from "@langchain/ollama";
import ConnectDB from "../config/ConnectDB.js";

export async function askQuestion(question,documentId) {
    await ConnectDB();

    const embedding = new OllamaEmbeddings({
        model: "nomic-embed-text",
    });
    console.log(question,documentId)
    const db = mongoose.connection.db;

    if (!db) {
        throw new Error("MongoDB connection is not ready");
    }

    const collection = db.collection("chunks");

    const vectorStore = new MongoDBAtlasVectorSearch(
        embedding,
        {
            collection,
            indexName: "embedding",
            textKey: "pageContent",
            embeddingKey: "embedding",
        }
    );

    const retriever = vectorStore.asRetriever({
        k: 3,
        filter: {
            preFilter: {
                documentId: documentId,
            },
        },
    });

    

    const docs = await retriever.invoke(question);

    const context = docs.map(doc => doc.pageContent).join("\n\n");

    const llm = new ChatOllama({ model: "llama3.2" });

    const prompt = `Answer the question using only the provided context. Context:${context} Question:${question}`;

    const response = await llm.invoke(prompt);

    return response.content;
}

export default askQuestion;