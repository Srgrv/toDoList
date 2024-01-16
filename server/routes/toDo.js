import { Router } from "express";

//controllers
import {
  getCompletedTodos,
  getInProgressTodos,
  getPendingTodos,
} from "../controllers/toDo.js";

const router = new Router();

//getCompletedTodos
router.get("/getCompletedTodos", getCompletedTodos);

//getInProgressTodos
router.get("/getInProgressTodos", getInProgressTodos);

//getPendingTodos
router.get("/getPendingTodos", getPendingTodos);

export default router;
