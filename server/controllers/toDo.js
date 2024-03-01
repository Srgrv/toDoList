import toDo from "../models/toDo.js";

//=================================================================post
export const createToDo = async (req, res) => {
  const { title, description } = req.body;

  const newToDo = new toDo({
    title,
    description,
  });

  await newToDo.save();
  res.json({ newToDo, message: "Задача была добавлена" });
};

//=================================================================get
// export const getCompletedTodos = async (req, res) => {
//   try {
//     const todos = await toDo.find({ status: "выполнено" }).sort("-createdAt");

//     if (!todos) {
//       return res.json({
//         message: "Нет выполненных задач",
//       });
//     }

//     res.json({
//       todos,
//     });
//   } catch (error) {
//     res.json({
//       error,
//       message: "Что-то пошло не так с получением выполненных задач",
//     });
//   }
// };
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
      error: error.message,
      message:
        "Что-то пошло не так с получением задач, находящийхся в ожидании выполнения",
    });
  }
};
export const get_completedTodos = async (req, res) => {
  try {
    const todos = await toDo.find({ status: "выполнен" }).sort("-createdAt");

    if (!todos) {
      return res.json({
        message: "Нет задач, находящиеся в ожидании выполнения",
      });
    }

    res.json({
      message: "Получение задач, находящихся в ожидании прошло успешно",
      todos,
    });
  } catch (error) {
    res.json({
      error,
      message:
        "Что-то пошло не так с получением задач, находящийхся в ожидании выполнения",
    });
  }
};

//=================================================================update
export const put_updateTodo = async (req, res) => {
  try {
    const { title, description, todoId } = req.body;

    const todo = await toDo.findById(todoId);

    todo.title = title;
    todo.description = description;

    await todo.save();

    res.json({ todo, message: "Задача была обновлена" });
  } catch (error) {
    res.json({
      message: `Задача не была обновлена на стороне сервера: ${error}`,
    });
  }
};
export const put_comleteTodo = async (req, res) => {
  try {
    const { todoId } = req.body;

    const todo = await toDo.findByIdAndUpdate(
      todoId,
      {
        $set: { status: "выполнен", checked: true },
      },
      { new: true }
    );

    // (err) => {
    //   if (err) {
    //     res.json({
    //       message: `Произошла ошибка при обновлении статуса: ${err}`,
    //     });
    //   } else {
    //     res.json({
    //       message: `Значение по умолчанию для поля status успешно изменено на "выполенено"`,
    //     });
    //   }
    // };

    res.json({ todo, message: "Задача была выполнена" });
  } catch (error) {
    res.json({
      error,
      message: `Задача не была выполнена. Ошибка на стороне сервера: ${error}`,
    });
  }
};
export const put_incompleteTodo = async (req, res) => {
  try {
    const { todoId } = req.body;
    const todo = await toDo.findByIdAndUpdate(
      todoId,
      {
        $set: { status: "ожидает выполнения", checked: false },
      },
      { new: true }
    );

    res.json({
      todo,
      message: `Значение по умолчанию для поля status успешно обновлено на "ожидает выполнения"`,
    });

    // (err) => {
    //   if (err) {
    //     res.json({
    //       message: `Произошла ошибка при обновлении статуса: ${err}`,
    //     });
    //   } else {
    //     res.json({
    //       todo,
    //       message: `Значение по умолчанию для поля status успешно обновлено на "ожидает выполнения"`,
    //     });
    //   }
    // };
  } catch (error) {
    res.json({
      message: `Произошла ошибка отмены задачи. Ошибка на стороне сервера: ${error}`,
    });
  }
};

//=================================================================delete
export const delete_removeTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const todo = await toDo.findByIdAndDelete(todoId);

    if (!todo) {
      return res.json({ message: "Такой задачи не существует" });
    }

    res.json({ todoId, message: "Задача была удалена" });
  } catch (error) {
    res.json({ message: `Произошла ошибка при удалении: ${error}` });
  }
};

//нужно сделать так, чтобы при нажатии на кастомный инпут задача меняла статус на "завершен", и при нажатии на завершенные задача, та задача появлялась там
