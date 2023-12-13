const mongoose = require("mongoose")
const TaskSchemaObj  = new mongoose.Schema({
    name: {
        type: String,
        req: true
    },
    
    deadline: {
        type: String,
        req: false
    },
    text: {
        type: String,
        req: true
    },
    parent: {
        type: String,
        req: true
    }
})
let TaskSchema 
try {
    TaskSchema  = mongoose.model("Task")
} catch {
    TaskSchema  = mongoose.model("Task", TaskSchemaObj )
}
export default TaskSchema 
