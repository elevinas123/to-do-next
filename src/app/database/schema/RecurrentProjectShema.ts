import mongoose, { Schema, Document, Model } from "mongoose";
import { ITask } from "./TaskSchema";

// Define the Task document interface

// Task Schema
const TaskSchema = new Schema<ITask>({
    name: {
        type: String,
        required: true,
    },
    text: String,
    place: String,
    deadline: String,
    comments: String,
    index: {
        type: Number,
        required: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel", // Dynamic reference
    },
    onModel: {
        type: String,
        required: true,
        enum: ["Projects", "Task"], // Allowed models for the parent reference
    },
});

// Define the Recurrent Project document interface
export interface IRecurrentProject extends Document {
    name: string;
    account: string;
    description?: string;
    tasks: Map<string, ITask[]>; // TypeScript map of string to arrays of ITask
    referenceTasks: mongoose.Types.ObjectId[];
    comments?: string;
    place?: string;
    parent?: mongoose.Types.ObjectId;
    onModel?: "Projects" | "Task";
    isRootProject: boolean;
}

// RecurrentProject Schema
const RecurrentProjectSchema = new Schema<IRecurrentProject>({
    name: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    description: String,
    tasks: {
        type: Map,
        of: [TaskSchema], // Embedding TaskSchema directly
    },
    referenceTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    comments: String,
    place: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "onModel",
        required: false,
    },
    onModel: {
        type: String,
        enum: ["Projects", "Task"],
        required: function () {
            return this.parent != null;
        },
    },
    isRootProject: {
        type: Boolean,
        default: false,
    },
});

// Conditionally initialize the model
let RecurrentProjectModel: Model<IRecurrentProject>;
try {
    RecurrentProjectModel = mongoose.model<IRecurrentProject>("RecurrentProjects");
} catch (error) {
    RecurrentProjectModel = mongoose.model<IRecurrentProject>("RecurrentProjects", RecurrentProjectSchema);
}

export default RecurrentProjectModel;
