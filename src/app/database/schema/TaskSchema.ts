import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface to represent a Task document.
export interface ITaskSchema extends Document {
    name: string;
    text: string;
    place: string;
    deadline?: string;
    comments?: string;
    type: string;
    index: number;
    parent: mongoose.Types.ObjectId;
    onModel: "Projects" | "Task";
}
export interface ITask {
    _id: string
    name: string;
    text: string;
    place: string;
    deadline?: string;
    comments?: string;
    type: string;
    index: number;
    parent: mongoose.Types.ObjectId;
    onModel: "Projects" | "Task";
}

// Define the Task schema with typed fields.
const TaskSchema = new Schema<ITaskSchema>({
    name: {
        type: String,
        required: true,
    },
    text: String,
    place: String,
    deadline: String,
    comments: String,
    type: String,
    index: {
        type: Number,
        required: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel", // This points to a field in the same doc that determines the ref model.
    },
    onModel: {
        type: String,
        required: true,
        enum: ["Projects", "Task"], // Specifies allowed models for dynamic referencing.
    },
});

// Try to get the already registered 'Task' model, or create a new one if it doesn't exist.
let TaskModel: Model<ITaskSchema>;
try {
    TaskModel = mongoose.model<ITaskSchema>("Task");
} catch (error) {
    TaskModel = mongoose.model<ITaskSchema>("Task", TaskSchema);
}

export default TaskModel;
