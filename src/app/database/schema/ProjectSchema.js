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
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    comments: String,
    place: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'onModel',
        required: false // Making the parent optional
    },
    onModel: {
        type: String,
        enum: ['Projects', 'Task'],
        required: function() { return this.parent != null; }
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

