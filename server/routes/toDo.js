import { Router } from "express";

//controllers
import {
  getCompletedTodos,
  getInProgressTodos,
  getPendingTodos,
  createToDo,
} from "../controllers/toDo.js";

const router = new Router();

//get
router.get("/getCompletedTodos", getCompletedTodos);
router.get("/getInProgressTodos", getInProgressTodos);
router.get("/getPendingTodos", getPendingTodos);
router.post("/createToDo", createToDo);

//create

export default router;
