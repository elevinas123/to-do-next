import mongoose, { Schema, Document, Model } from "mongoose";
import { ITask } from "./TaskSchema";

// Define an interface that extends mongoose's Document to type the model's expected properties
export interface IProjectSchema extends Document {
    name: string;
    account: string;
    description?: string;
    tasks: Map<ITask, mongoose.Types.ObjectId[]>;
    onModel: ("Projects" | "Task")[];
    index?: number;
    type?: string;
    comments?: string;
    place?: string;
    parent?: mongoose.Types.ObjectId;
    isRootProject: boolean;
}
export interface IProject  {
    _id: string
    name: string;
    account: string;
    description?: string;
    tasks: ITask[]
    onModel: ("Projects" | "Task")[];
    index?: number;
    type?: string;
    comments?: string;
    place?: string;
    parent?: mongoose.Types.ObjectId;
    isRootProject: boolean;
}

// Create a new mongoose schema for projects with typed properties
const ProjectSchema = new Schema<IProject>({
    name: {
        type: String,
        required: true,
    },
    account: {
        type: String,
        required: true,
    },
    description: String,
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "onModel",
        },
    ],
    onModel: [
        {
            type: String,
            enum: ["Projects", "Task"],
        },
    ],
    index: Number,
    type: String,
    comments: String,
    place: String,
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // Making the parent optional
    },
    isRootProject: {
        type: Boolean,
        default: false, // Field to indicate if this is a top-level project
    },
});

let ProjectModel: Model<IProject>;
try {
    // Trying to get the model if it already exists
    ProjectModel = mongoose.model<IProject>("Projects");
} catch {
    // If it does not exist, create it
    ProjectModel = mongoose.model<IProject>("Projects", ProjectSchema);
}

export default ProjectModel;
