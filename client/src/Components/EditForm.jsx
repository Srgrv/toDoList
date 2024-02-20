import React, { useState } from "react";
import { useDispatch } from "react-redux";

//extra-reducers
import { UPDATE_TODO } from "../store/slices/toDoSlice";

//css
import style from "./EditForm.module.css";

const EditForm = ({ cancel, title, description, todoId }) => {
  const dispatch = useDispatch();

  // console.log(title);

  const [titleInput, setTitleInput] = useState(title);
  const [descriptionInput, setDescriptionInput] = useState(description);

  const updateTodo = (titleInput, descriptionInput, todoId) => {
    dispatch(UPDATE_TODO({ titleInput, descriptionInput, todoId }));
    cancel();
  };

  return (
    <div className={style.todoInput}>
      <div className={style.todoInputItem}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="What's the title of your To Do?"
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            placeholder="What's the description of your To Do?"
          />
        </div>
      </div>
      <div className={style.todoInputButton}>
        <button
          className={`${style.primaryBtn} ${style.addBtn}`}
          type="button"
          onClick={() => updateTodo(titleInput, descriptionInput, todoId)}
        >
          Edit
        </button>
        <button
          className={`${style.primaryBtn} ${style.cancelBtn}`}
          type="button"
          onClick={cancel}
        >
          Cancel
        </button>
      </div>
      {/* <div className={style.todoInputItem}></div> */}
    </div>
  );
};

export default EditForm;
