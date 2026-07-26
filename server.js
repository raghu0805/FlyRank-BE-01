import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;



const db = [
    { id: 1, title: "Learn authentication", done: false },
    { id: 2, title: "Learn JavaScript", done: false },
    { id: 3, title: "Learn authorization", done: false }
];


//startup enpoint
app.get("/", (req, res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
})

//health checkup
app.get("/health", (req, res) => {
    res.json({ "status": "ok" });
})

//Get routes
//tasks
app.get("/tasks", (req, res) => {
    return res.status(200).json(db);
});

//task using id
app.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = db.find((task) => task.id == id);
    if (!task) {
        return res.status(404).json({"error":"Task 99 not found"});
    }
    return res.status(200).json(task);
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})