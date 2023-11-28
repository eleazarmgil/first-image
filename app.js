const express = require('express');
const connectDB = require('./db')
const User = require('./users');

const app = express();
app.use(express.json());

connectDB();

app.get('/status', (req, res) => {
    res.send('pong');
});



app.get('/directories', async (req, res) => {
    try {
        const directories = await User.find();
        res.json(directories);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/directories/:id', async (req, res) => {    //http://localhost:3000/directories/1
    try {
        const directory = await User.findById(req.params.id);
        if (!directory) throw new Error('directorio no encontrado');
        res.json(directory);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});



app.post('/directories', async (req, res) => {    //http://localhost:3000/directories/1
    try {
        const { name, email} = req.body;
        const directory = new User({ name, email);
        await directory.save();
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.put('/directories/:id', async (req, res) => {    //http://localhost:3000/directories/1
    try {
        const directory = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!directory) throw new Error('User not found');
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.patch('/directories/:id', async (req, res) => {
    try {
        const directory = await User.findById(req.params.id);
        if (!directory) throw new Error('User not found');

      
        if (req.body.name) directory.name = req.body.name;
        if (req.body.email) directory.email = req.body.email;


        await directory.save();

        res.json({ success: true });
    } catch (error) {
        res.status(500).send(error.message);
    }
});



app.delete('/directories/:id', async (req, res) => {    //http://localhost:3000/directories/1
    try {
        const directory = await User.findByIdAndDelete(req.params.id);
        if (!directory) throw new Error('User not found');
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