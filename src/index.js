const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (request, response)=>{
    response.send('Start server')
});

app.listen(PORT);