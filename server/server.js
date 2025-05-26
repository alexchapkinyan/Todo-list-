import 'dotenv/config';
import fs from 'fs';
import express from 'express';
import cors from 'cors';

const port = process.env.PORT || 5008;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/tasks', (req, res) => {
    const data = fs.readFileSync('./data.json', 'utf-8');
    res.send(data);
});

app.patch('/tasks/:id', (req, res) => {
    const taskId = req.params.id

    const data = fs.readFileSync('./data.json', 'utf-8');
    const tasks = JSON.parse(data);
    const task = tasks.find(t => t.id === taskId);

    if(!task) return res.status(404).json({ error: 'Task not found' });

    const updatedTasks = tasks.map(t => 
        t.id === taskId ? { ...t, ...req.body } : t
    );

    fs.writeFileSync('./data.json', JSON.stringify(updatedTasks));

    res.json(task);
});


app.post('/tasks', (req, res) => {
    const newTask = req.body;
    const data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));
    data.push(newTask);
    fs.writeFileSync('./data.json', JSON.stringify(data));
    res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const file = fs.readFileSync('./data.json', 'utf-8');
        const data = JSON.parse(file);
        const newData = data.filter(task => !(task.id === taskId));
        fs.writeFileSync('./data.json', JSON.stringify(newData));
        res.status(200).json({ message: 'Task deleted', data: newData });
    } catch (error) {
        console.error('Delete failed', error);
        res.status(500).json({ message: 'Failed to delete task' });
    };
})


app.listen(port, (err) => {
    if(err) {
        console.log(err)
    } else console.log(`Server runned on ${port} port`)
})



