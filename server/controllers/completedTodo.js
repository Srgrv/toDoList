import toDo from "../models/toDo.js";

export const createToDo = async (req, res) => {
  const { title, description } = req.body;

  const newToDo = new toDo({
    title,
    description,
  });

  await newToDo.save();
  res.json({ newToDo, message: "Задача была добавлена" });
};

export const put_updateTodo = async (req, res) => {
  try {
    const { titleInput, descriptionInput, todoId } = req.body;

    const todo = await toDo.findById(todoId);

    todo.title = titleInput;
    todo.description = descriptionInput;

    await todo.save();

    res.json({ todo, message: "Задача была обновлена" });
  } catch (error) {
    res.json({
      message: `Задача не была обновлена на стороне сервера: ${error}`,
    });
  }
};

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

export const getPendingTodos = async (req, res) => {
  try {
    const todos = await toDo
      .find({ status: "ожидает выполнения" })
      .sort("-createdAt");

    if (!todos) {
      return res.json({
        message: "Нет задач, находящиеся в ожидании выполнения",
      });
    }

    res.json({
      todos,
      message: "Получение задач, находящихся в ожидании прошло успешно",
    });
  } catch (error) {
    res.json({
      error,
      message:
        "Что-то пошло не так с получением задач, находящийхся в ожидании выполнения",
    });
  }
};

export const get_completedTodos = async (req, res) => {
  try {
    const completedTodos = await toDo
      .find({ status: "выполнен" })
      .sort("-createdAt");

    if (!completedTodos) {
      return res.json({
        message: `Нет выполненных задач`,
      });
    }

    res.json({
      completedTodos,
      message: "Получение выполненных задач прошло успешно",
    });
  } catch (error) {
    res.json({
      message: `Произошла ошибка на сервере. Ошибка получения выполненных задач: ${error}`,
    });
  }
};

export const delete_removeTodo = async (req, res) => {
  try {
    const todo = await toDo.findByIdAndDelete(req.params.todoId);

    console.log(todo);

    if (!todo) {
      return res.json({ message: "Такой задачи не существует" });
    }

    res.json({ message: "Задача была удалена" });
  } catch (error) {
    res.json({ message: `Произошла ошибка при удалении: ${error}` });
  }
};
