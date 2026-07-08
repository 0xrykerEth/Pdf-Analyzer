import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Document = new Schema({
    title :{
        type : String,
        required : true,
    },
    uploadedBy : {
        type : String,
    },
    status: {
    type: String,
    enum: ["processing", "completed", "failed"],
    default: "processing"
    },
    totalPages : {
        type : Number,
        default: 0
    },
    totalChunks :{
        type : Number,
        default: 0
    },
    uploadedAt : {
        type : Date,
        default: Date.now
    }
})

const DocumentModel = mongoose.model("Document", Document);

export default DocumentModel;