import mongoose, { Schema, Model, Document } from "mongoose";

// Define an interface that extends mongoose's Document to type the model's expected properties

export interface IAccount {
    username: string;
    password: string;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>;
}

interface IAccountSchema extends Document {
    username: string;
    password: string;
}

// Create a new mongoose schema for accounts with typed properties
const AccountsSchema = new Schema<IAccountSchema>({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

// Conditionally initialize the model or retrieve it if it already exists
let AccSchema: Model<IAccountSchema>;
try {
    // Trying to get the model if it already exists
    AccSchema = mongoose.model<IAccountSchema>("UserAccounts");
} catch (error) {
    // If it does not exist, create it
    AccSchema = mongoose.model<IAccountSchema>("UserAccounts", AccountsSchema);
}

export default AccSchema;
