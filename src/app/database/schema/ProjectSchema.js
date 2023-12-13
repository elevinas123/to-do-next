
const TaskSchema = require('./TaskSchema'); // Assuming Task schema is defined in Task.js

const mongoose = require("mongoose")
const ProjectSchemaObj = new mongoose.Schema({
    name: {
        type: String,
        req: true
    },
    account: String,
    description: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }], // Array of task references
    
})
let ProjectSchema
try {
    ProjectSchema = mongoose.model("Projects")
} catch {
    ProjectSchema = mongoose.model("Projects", ProjectSchemaObj)
}
export default ProjectSchema