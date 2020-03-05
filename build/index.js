import express from 'express';
var app = express();
app.get('/', function (req, resp) {
    resp.send('Hello get server');
});
app.listen(3000, function () {
    console.log('Corriendo en el puerto 3000');
});
