import mongoose, { Schema, Document, Model } from "mongoose";
import { ITask } from "./TaskSchema";

// Define an interface that extends mongoose's Document to type the model's expected properties
export interface IProjectSchema extends Document {
    name: string;
    account: string;
    description: string;
    tasks: Map<ITask, mongoose.Types.ObjectId[]>;
    onModel: ("Projects" | "Task")[];
    index: number;
    type: string;
    comments: string;
    place: string;
    parent: mongoose.Types.ObjectId;
    isRootProject: boolean;
}
export interface IProject {
    _id: ItemId;
    name: string;
    account: string;
    description: string;
    tasks: Tasks;
    onModel: ("Projects" | "Task")[];
    index: number;
    type: "Project" | "Task";
    comments: string;
    place: string;
    parent: ParentId;
    isRootProject: boolean;
    deadline: string
}

export type ParentId = mongoose.Types.ObjectId | null;
export type ItemId = mongoose.Types.ObjectId;
export type Tasks = (ITask | IProject)[];
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
    description: {
        type: String,
        required: true,
    },
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
    index: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        required: false, // Making the parent optional
    },
    isRootProject: {
        type: Boolean,
        default: false, // Field to indicate if this is a top-level project
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
});

let Project: Model<IProject>;
try {
    // Trying to get the model if it already exists
    Project = mongoose.model<IProject>("Projects");
} catch {
    // If it does not exist, create it
    Project = mongoose.model<IProject>("Projects", ProjectSchema);
}

export default Project;
