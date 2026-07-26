import express from "express";
import dotenv from "dotenv";


import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import taskRoutes from "./routes/task.js";
dotenv.config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use("/",taskRoutes);
//startup enpoint
app.get("/", (req, res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
})

//health checkup
app.get("/health", (req, res) => {
    res.json({ "status": "ok" });
})


const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs,{explorer:true})
);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})