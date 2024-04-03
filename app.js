const express = require('express');
const socket = require('socketio');
const routes = require('./controller/route')
const users = require('./controller/user')
const PORT = 8080;

const server = express();
server.use(express.json())
server.listen(PORT)


server.get('/', (req, res) => {
    res.status(200);
    res.send("you're on Home Page");
})

server.post('/signup', async(req, res) => {
    const response = await users.signUp(req, res);
    res.status(response.status);
    const data = response.data;
    res.send({
        status: response.status,
        data: data
    }); 
})

server.post('/login', async(req, res) => {
    const response = await users.login(req, res);
    res.status(response.status);
    const data = response.data;
    res.send({
        status: response.status,
        data: data
    });
})
server.post('/roadmap', async(req, res) => {
    const response = await routes.roadmap(req, res);
    res.status(response.status);
    const data = response.data;
    console.log('JSON ', data)
    res.send({
        status: response.status,
        data: data
    });
});
server.post('/learn', async(req, res) => {
    const response = await routes.learn(req, res);
    res.status(response.status);
    const data = response.data;
    console.log('JSON ', data)
    res.send({
        status: response.status,
        data: data
    }); 
})