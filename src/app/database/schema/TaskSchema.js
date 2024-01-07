const mongoose = require("mongoose");

const TaskSchemaObj = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text: String,
    place: String,
    deadline: String, // Made optional by removing `required: true`
    comments: String,
    type: String,
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

let Task
try {
    Task = mongoose.model("Task")
} catch {
    Task = mongoose.model("Task", TaskSchemaObj)
}
export default Task
