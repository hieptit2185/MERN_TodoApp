const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');
const port = 6969;

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect(`mongodb+srv://khachiep:khachiep12@cluster0.75k6z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connect to DB")
    })
    .catch(console.error)

const Todo = require('./models/Todo');

app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        content: req.body.content,
        due_date: req.body.due_date || moment().format("L"),
    })
    todo.save();

    res.json(todo);
})

app.get('/todo/status/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.status = !todo.status;
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.put('/todo/update/:id', async (req, res) => {
    const result = await Todo.findByIdAndUpdate(req.params.id, { content: req.body.content })

    res.json(result);
})

app.get('/todo/completed/', async (req, res) => {
    const todos = await Todo.find();
    const result = todos.filter(todo => todo.status === true);
    res.json(result);
})

app.get('/todo/active', async (req, res) => {
    const todos = await Todo.find();
    const result = todos.filter(todo => todo.status === false);
    res.json(result);
})

app.get("/todo/all", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})


// app.get('/todo/dateDown', async (req, res) => {
//     const todos = await Todo.find();
//     const result = todos.sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
//     res.json(result);
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})