import mongoose from "mongoose";


const TaskSchemaObj = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text: String,
    place: String,
    deadline: String, // Made optional by removing `required: true`
    comments: String,
    index: {
        type: Number,
        required: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId, // Assuming parent is a reference to a Project or another Task
        required: true,
        refPath: 'onModel'  // This is used for dynamic references
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Projects', 'Task']  // Allowed models for the parent reference
    }
});

const RecurrentProjectSchemaObj = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    description: String,
    tasks: {
        type: Map,
        of: [TaskSchemaObj] // Embedding TaskSchemaObj directly
    },
    referenceTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
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

let RecurrentProject
try {
    RecurrentProject = mongoose.model("RecurrentProjects")
} catch {
    RecurrentProject = mongoose.model("RecurrentProjects", RecurrentProjectSchemaObj)
}
export default RecurrentProject

