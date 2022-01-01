const express = require('express');
const fs = require('fs')
var path = require('path');
const app = express();
const port = process.env.PORT || 8000;
const Services = require('./Api/serverServices')
app.use(express.static("public"))   
let db = {
    users: {},
    tasks: {}
}
fs.readFile('./Assets/users.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const parsedData = JSON.parse(data).map(el => {
            return { ...el, address: { ...el.address, geo: { lat: parseFloat(el.address.geo.lat), lng: parseFloat(el.address.geo.lng) } } }
        })

        db.users = parsedData
    }
})
fs.readFile('./Assets/tasks.json', 'utf8', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        db.tasks = JSON.parse(data);
    }
})

app.get('/api/tasks', (req, res) => {
    const response = Services.tasks.get({ data: db.tasks, ...req.query })
    res.header("Access-Control-Allow-Origin", "*")
    return res.status(200).json(response)
})

app.get('/api/tasks/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const response = Services.tasks.getById({ data: db.tasks, id: req.params.id })
    return res.status(response.status).json(response.json)
})

app.get('/api/users', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const response = Services.users.get({ data: db.users })
    return res.status(response.status).json(response.json)
})
app.get('/api/users/:user_id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const response = Services.users.getById({ id: req.params.user_id, data: db.users })
    return res.status(response.status).json(response.json)
})
app.get('/api/users/:user_id/tasks', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    const response = Services.users.getTasksFromUser({ id: req.params.user_id, ...req.query, data: db.tasks })
    return res.status(response.status).json(response.json)
})

app.listen(port, () => {
    console.log("Listening on: " + port);
})