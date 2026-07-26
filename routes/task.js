/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - done
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         done: 
 *           type: boolean
 *           description: The status of your book
 */

import express from "express";
const router = express.Router();

const db = [
    { id: 1, title: "Learn authentication", done: false },
    { id: 2, title: "Learn JavaScript", done: false },
    { id: 3, title: "Learn authorization", done: false }
];

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Returns a list of all available tasks.
 *     tags:
 *       - Tasks
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
//Get routes
//tasks
router.get("/tasks", (req, res) => {
    return res.status(200).json(db);
});


/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Returns a single task using its ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
//task using id
router.get("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = db.find((task) => task.id == id);
    if (!task) {
        return res.status(404).json({"error":"Task not found"});
    }
    return res.status(200).json(task);
});




//Post Routes
//create task
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: Creates a new task and stores it in memory.
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Swagger
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid request
 */
router.post("/tasks",(req,res)=>{
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
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Updates the title or completion status of a task.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Node.js
 *               done:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.put("/tasks/:id",(req,res)=>{
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
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Deletes a task using its ID.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = db.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const deletedTask = db.splice(index, 1)[0];

    return res.status(200).json({deletedTask});
});


export default router;