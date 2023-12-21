const mongoose = require("mongoose");

const SubTaskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    subTaskId: {
        type: String,
        required: true
    }
});

const TaskSchemaObj = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: false
    },
    subTasks: [SubTaskSchema], // Define subTasks as an array of SubTaskSchema
    parent: {
        type: String,
        required: true
    }
});

let TaskSchema;
try {
    TaskSchema = mongoose.model("Task");
} catch {
    TaskSchema = mongoose.model("Task", TaskSchemaObj);
}

export default TaskSchema;
