const mongoose = require("mongoose");

const TaskSchemaObj = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
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
        enum: ['Project', 'Task']  // Allowed models for the parent reference
    }
});

// Singleton pattern to avoid recompilation of model
const TaskSchema = mongoose.models.TaskSchema || mongoose.model("Task", TaskSchemaObj);
export default TaskSchema