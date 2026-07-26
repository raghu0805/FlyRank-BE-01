import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get("/", (req, res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
})
app.get("/health", (req, res) => {
    res.json({ "status": "ok" } );
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})