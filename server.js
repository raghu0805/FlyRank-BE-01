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
    const id = parseInt(req.params.id);
    const task = db.find((task) => task.id == id);
    if (!task) {
        return res.status(404).json({"error":"Task not found"});
    }
    return res.status(200).json(task);
});

//Post Routes
//create task
app.post("/tasks",(req,res)=>{
    const data=req.body;
    if(!data){
        return res.status(400).json({message:"No data from Request" });
    }
    if(!data.title ){
        return res.status(400).json({message:"Title required" });
    }
    const task={id:db.length+1,title:data.title,done:false};
    db.push(task);
    return res.status(201).json({task});
})

//PUT Routes
//update task
app.put("/tasks/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const task = db.find((task) => task.id == id);
    if (!task) {
        return res.status(404).json({"error":"Task not found"});
    }
    db.map(task => {

        if(task.id === id)
            {
                if(req.body.title){
                    task.title=req.body.title;
                }      
                if(req.body.done!==undefined){
                    task.done=req.body.done;
                }
            }
            else{
                return task;
            }
        }
    );
    const updated= db.find((task) => task.id == id);
    return res.status(204).json({updated});
})

//Delete Routes
//delete task
app.delete("/tasks/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const task = db.find((task) => task.id == id);
    if (!task) {
        return res.status(404).json({"error":"Task not found"});
    }
    db.filter((task) => task.id !== id);
    return res.status(204).json({task});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})