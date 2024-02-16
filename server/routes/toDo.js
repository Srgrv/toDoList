import { Router } from "express";

//controllers
import {
  // getCompletedTodos,
  getInProgressTodos,
  getPendingTodos,
  get_completedTodos,
  createToDo,
  put_updateTodo,
  put_comleteTodo,
  put_incompleteTodo,
  delete_removeTodo,
} from "../controllers/toDo.js";

const router = new Router();

//get
// router.get("/getCompletedTodos", getCompletedTodos);
router.get("/getInProgressTodos", getInProgressTodos);
router.get("/getPendingTodos", getPendingTodos);
router.get("/getCompletedTodos", get_completedTodos);

//post
router.post("/createToDo", createToDo);

//put
router.put("/updateTodo", put_updateTodo);
router.put("/completeTodo", put_comleteTodo);
router.put("/incompleteTodo", put_incompleteTodo);

//delete
router.delete("/removeTodo/:todoId", delete_removeTodo);

export default router;
