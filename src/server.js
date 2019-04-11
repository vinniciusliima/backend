const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');


app.use(cors());


io.on('connection', socket => {
    console.log("ok");
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-6m8rx.mongodb.net/test?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

app.use((req, res, next) => {
    req.io = io;
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(require("./routes"));
/*app.get('/teste', (req, res) => {
    return res.send('Hello Word');
});
*/
server.listen(2711);