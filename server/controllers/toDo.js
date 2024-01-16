import toDo from "../models/toDo.js";

export const getCompletedTodos = async (req, res) => {
  try {
    const todos = await toDo.find({ status: "выполнено" }).sort("-createdAt");

    if (!todos) {
      return res.json({
        message: "Нет выполненных задач",
      });
    }

    res.json({
      todos,
    });
  } catch (error) {
    res.json({
      error,
      message: "Что-то пошло не так с получением выполненных задач",
    });
  }
};

export const getInProgressTodos = async (req, res) => {
  try {
    const todos = await toDo.find({ status: "в процессе" }).sort("-createdAt");

    if (!todos) {
      return res.json({
        message: "Нет задач, находящиеся в процессе",
      });
    }

    res.json({
      todos,
    });
  } catch (error) {
    res.json({
      error,
      message:
        "Что-то пошло не так с получением задач, находящийхся в процессе",
    });
  }
};
