const mongoose = require("mongoose")
const Accounts = new mongoose.Schema({
    username: String,
    password: String
})
let AccSchema
try {
    AccSchema = mongoose.model("UserAccounts")
} catch {
    AccSchema = mongoose.model("UserAccounts", Accounts)
}
export default AccSchema