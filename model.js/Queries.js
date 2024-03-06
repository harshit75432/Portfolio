let mongoose = require('mongoose')
let querySchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    message : {
        type : String
    }
})

let query = mongoose.model('Queries',querySchema)
module.exports = query