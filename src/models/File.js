const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    path: {
        type: String,
        require: true
    },
}, {
        timestamps: true

    }
);

File.virtual('url').get(function () {
    return `localhost:2711/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model("File", File);