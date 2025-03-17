const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login/index.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register/index.html'));
})

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, 'main/index.html'));
})

app.listen(8080, () => {
    console.log('server is running');
})

