const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000/",
        methods: ["GET", "POST"],
      }
});

//Criando evento 
io.on('connection', socket => {

    socket.on("disconnect", () => {
        console.log('X Desconectou: ' + socket.id)
    });


    socket.on("msg", data => {
        io.emit("showmsg", data);
        console.log(data)
    })

});

app.use(express.static('public'));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index')
})

http.listen(3000, () => console.log('App rodando'));