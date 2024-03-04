import React, { useState, useMemo } from "react";
import classes from "./List.module.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";

//components
import ListOfPendingTodos from "./ListOfPendingTodos/ListOfPendingTodos";
import ListOfCompletedTodos from "./ListOfCompletedTodos/ListOfCompletedTodos";

//reducers
import { TOGGLE_IS_COMPLETE_SCREEN } from "../store/slices/toDoSlice";

//extra-reducers
import { createTodo } from "../store/slices/toDoSlice";

const List = () => {
  const dispatch = useAppDispatch();

  const isCompletedScreen = useAppSelector(
    (state) => state.todos.isCompletedScreen
  );

  const memoizedIsCompletedScreen = useMemo(
    () => isCompletedScreen,
    [isCompletedScreen]
  );

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const addNewTodo = (title: string, description: string) => {
    if (title && description) {
      dispatch(createTodo({ title, description }));
      setTitle("");
      setDescription("");
    } else {
      alert("Параметры title и description обязательно");
    }
  };

  const toggleIsCompleteScreen = (boolean: boolean) => {
    dispatch(TOGGLE_IS_COMPLETE_SCREEN(boolean));
  };

  console.log("render List");

  return (
    <div className={classes.todoWrapper}>
      <div className={classes.todoInput}>
        <div className={classes.todoInputItem}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's the title of your To Do?"
          />
        </div>
        <div className={classes.todoInputItem}>
          <label>Description:</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's the description of your To Do?"
          />
        </div>
        <div className={classes.todoInputItem}>
          <button
            className={classes.primaryBtn}
            type="button"
            onClick={() =>
              // setTimeout(() => addNewTodo(title, description), 400)
              addNewTodo(title, description)
            }
          >
            Add
          </button>
        </div>
      </div>
      <div className={classes.btnArea}>
        <button
          className={`${classes.secondaryBtn} ${
            memoizedIsCompletedScreen === false && classes.active
          }`}
          onClick={() => toggleIsCompleteScreen(false)}
        >
          Pending todos
        </button>
        <button
          className={`${classes.secondaryBtn} ${
            memoizedIsCompletedScreen === true && classes.active
          }`}
          onClick={() => toggleIsCompleteScreen(true)}
        >
          Completed todos
        </button>
      </div>
      <div className={classes.todoList}>
        {memoizedIsCompletedScreen === false && <ListOfPendingTodos />}
        {memoizedIsCompletedScreen === true && <ListOfCompletedTodos />}
      </div>
    </div>
  );
};

export default List;

//1. Сделать так, чтобы при обновлении страницы, компонент с завершенными задачами не переходил на компонент с незавершенными задачами
//2. Убрать useEffect с List в соответсвующие компоненты (PendingTood, CompletedTodo)
//8. useSelector нужно мемеризировать чтобы не происходил лишний ререндер, а также нужно отедельно доставать данные из него

//3. Понять разницу между state.getState() и useSelector()
//4. Понять и решить проблему, когда при изменении статуса задачи, следующая задача получает в CustomCheckbox значечия для checked = true
//5. useRef(), useState()
//6. React.memo(), useMemo()
//7. useSearchParams() повторить для того, чтобы сделать так чтобы можно было скидывать ссылку кому-нибудь без потери параметров
