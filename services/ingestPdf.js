import mongoose from "mongoose";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OllamaEmbeddings } from "@langchain/ollama";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";

export async function ingestPdf(filePath, documentId, title) {
    const loader = new PDFLoader(filePath);
    const documents = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(documents);

    for (const doc of splitDocs) {
        doc.metadata = {
            ...doc.metadata,
            documentId: documentId.toString(),
            title,
        };
    }

    const embeddings = new OllamaEmbeddings({
        model: "nomic-embed-text",
    });

    const collection = mongoose.connection.db.collection("chunks");

    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
        collection,
        indexName: "embedding",
        textKey: "pageContent",
        embeddingKey: "embedding",
    });

    await vectorStore.addDocuments(splitDocs);

    return {
        totalPages: documents.length,
        totalChunks: splitDocs.length,
    };
}