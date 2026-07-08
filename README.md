# Pdf Analyzer

#  AI PDF Analyzer

An AI-powered PDF analysis application built with **LangChain**, **Node.js**, **MongoDB Atlas Vector Search**, **Ollama**, and **BullMQ**. The application processes uploaded PDF documents, generates vector embeddings, stores them in a vector database, and uses **Retrieval-Augmented Generation (RAG)** to answer questions and generate intelligent insights from document content.

Whether it's a resume, research paper, employee handbook, policy document, technical manual, or any other PDF, the application enables semantic search and AI-powered question answering.

---

##  Features

*  Upload and analyze PDF documents
*  Asynchronous background processing using BullMQ & Redis
*  Multi-document support
*  Automatic PDF text extraction
*  Intelligent document chunking using LangChain
*  Local embedding generation with Ollama (`nomic-embed-text`)
*  Semantic search using MongoDB Atlas Vector Search
*  AI-powered document question answering
*  Context-aware responses using Retrieval-Augmented Generation (RAG)
*  Scalable worker-based architecture

---

# 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### AI & RAG

* LangChain
* Ollama
* `nomic-embed-text`
* `llama3.2`

### Database

* MongoDB Atlas
* MongoDB Atlas Vector Search
* Mongoose

### Background Processing

* BullMQ
* Redis

### Other Libraries

* Multer

---

#  Architecture

```text
                   Upload PDF
                       │
                       ▼
               Express API Server
                       │
                Store Uploaded File
                       │
                       ▼
              BullMQ Queue (Redis)
                       │
                       ▼
               Background Worker
                       │
             LangChain PDFLoader
                       │
                       ▼
    RecursiveCharacterTextSplitter
                       │
                       ▼
         Ollama Embedding Generation
                       │
                       ▼
     MongoDB Atlas Vector Search
                       │
                       ▼
        LangChain Vector Retriever
                       │
                       ▼
              Ollama (LLM)
                       │
                       ▼
       AI Generated Answers & Insights
```

---

#  How It Works

### 1. Upload a PDF

Users upload any PDF document through the API.

### 2. Background Processing

The API immediately queues a BullMQ job, allowing the upload request to return without waiting for document processing.

### 3. PDF Processing

The worker:

* Loads the PDF using LangChain's `PDFLoader`
* Extracts text
* Splits the document into chunks using `RecursiveCharacterTextSplitter`
* Generates embeddings using Ollama
* Stores chunks and embeddings inside MongoDB Atlas Vector Search

### 4. Ask Questions

When a user submits a question:

* The question is converted into an embedding.
* MongoDB Atlas Vector Search retrieves the most relevant document chunks.
* LangChain injects the retrieved context into the prompt.
* Ollama generates a context-aware answer.

---

#  Project Structure

```text
.
├── config/
├── controllers/
├── models/
├── queue/
├── routes/
├── services/
├── uploads/
├── worker/
├── app.js
└── package.json
```

---

#  Installation

Clone the repository:

```bash
git clone https://github.com/your-username/ai-pdf-analyzer.git
cd ai-pdf-analyzer
```

Install dependencies:

```bash
npm install
```

---

#  Environment Variables

```env
MONGO_URI=your_mongodb_connection_string

REDIS_HOST=localhost
REDIS_PORT=6379

OLLAMA_URL=http://localhost:11434
```

---

# ▶️ Running the Project

### Start Redis

```bash
docker run -d -p 6379:6379 redis
```

or start your local Redis server.

---

### Start Ollama

```bash
ollama serve
```

Pull the required models:

```bash
ollama pull nomic-embed-text
ollama pull llama3.2
```

---

### Start the API

```bash
npm run dev
```

---

### Start the Worker

```bash
node worker/pdfWorker.js
```

---

# 📌 API Endpoints

## Upload PDF

```http
POST /upload
```

Uploads a PDF and queues it for background processing.

---

## Ask Questions

```http
POST /analyze
```

Returns AI-generated answers based on the uploaded document(s).

---

#  Key Concepts Demonstrated

* Retrieval-Augmented Generation (RAG)
* LangChain document processing
* PDF parsing and chunking
* Vector embeddings
* MongoDB Atlas Vector Search
* Semantic search
* Local LLM inference with Ollama
* Background job processing with BullMQ
* Redis-based task queue
* Scalable worker architecture

---

#  Future Improvements

* User authentication
* Source citations with page references
* Streaming AI responses
* Conversation history
* Cloud storage (AWS S3, Cloudinary)
* Docker Compose deployment
* Web interface for document management

---

#  Screenshots

Add screenshots or GIFs showing:

* PDF upload
* Processing status
* AI-generated answers
* Multi-document search

---

#  Author

Developed as a portfolio project to demonstrate practical experience with modern AI application development, LangChain, Retrieval-Augmented Generation (RAG), vector databases, semantic search, asynchronous processing, and scalable backend architecture.
