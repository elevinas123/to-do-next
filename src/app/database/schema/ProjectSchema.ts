import mongoose from "mongoose";

const ProjectSchemaObj = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    description: String,
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel' 
        
    }],
    onModel: [{ type: String, enum: ['Projects', 'Task'] }],
    index: Number,
    type: String,
    comments: String,
    place: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: false // Making the parent optional
    },
    
    isRootProject: {
        type: Boolean,
        default: false // Field to indicate if this is a top-level project
    }
});

let Project
try {
    Project = mongoose.model("Projects")
} catch {
    Project = mongoose.model("Projects", ProjectSchemaObj)
}
export default Project

