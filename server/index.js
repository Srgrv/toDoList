import express from "express"; // создание приложения
import mongoose from "mongoose"; // подключение к базе данных
import dotenv from "dotenv"; // шифрование в формате .env

//routes
import toDo from "./routes/toDo.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3002;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

app.use(express.json());

//getRoutes
app.use("/todos", toDo);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@todolist.texezdj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    );

    app.listen(PORT, () => {
      console.log(`Hello, server was started on the PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
