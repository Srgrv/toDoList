import toDo from "../models/toDo.js";

const getCompletedTodos = async (req, res) => {
  try {
    const todos = await toDo.find({ status: "выполнено" }).sort("-createdAt");

    if (!todos) {
      return res.json({
        message: "Задач нет",
      });
    }

    res.json({
      todos,
    });
  } catch (error) {
    res.json({ error, message: "Что-то пошло не так" });
  }
};
