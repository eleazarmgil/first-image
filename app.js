const express = require('express');
const connectDB = require('./db')
const User = require('./users');

const app = express();
app.use(express.json());

connectDB();



app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.get('/users/:id', async (req, res) => {    //http://localhost:3000/users/1
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new Error('usuario no encontrado');
        res.json(user);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.post('/users', async (req, res) => {    //http://localhost:3000/users/1
    try {
        const { nombre, apellido, edad } = req.body;
        const user = new User({ nombre, apellido, edad });
        await user.save();
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/users/:id', async (req, res) => {    //http://localhost:3000/users/1
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) throw new Error('User not found');
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.put('/users/:id', async (req, res) => {    //http://localhost:3000/users/1
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) throw new Error('User not found');
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.delete('/users/:id', async (req, res) => {    //http://localhost:3000/users/1
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) throw new Error('User not found');
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


const port = 5000;

app.listen(port, () => {
    console.log("API server started on port 5000");
})