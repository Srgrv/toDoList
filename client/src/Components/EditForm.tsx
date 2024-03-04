import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hooks";

//extra-reducers
import { UPDATE_TODO } from "../store/slices/toDoSlice";

//css
import style from "./EditForm.module.css";

//intefaces&types
import { IPropsUpdateTodo } from "../store/slices/toDoSlice";

interface IProps {
  cancel: () => void;
  titleInput: string;
  descriptionInput: string;
  todoId: string;
}

const EditForm: React.FC<IProps> = (props) => {
  const { cancel, titleInput, descriptionInput, todoId } = props;
  const dispatch = useAppDispatch();

  const [title, setTitleInput] = useState<string>(titleInput);
  const [description, setDescriptionInput] = useState<string>(descriptionInput);

  const updateTodo = (data: IPropsUpdateTodo) => {
    const { title, description, todoId } = data;
    dispatch(UPDATE_TODO({ title, description, todoId }));
    cancel();
  };

  return (
    <div className={style.todoInput}>
      <div className={style.todoInputItem}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="What's the title of your To Do?"
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescriptionInput(e.target.value)}
            placeholder="What's the description of your To Do?"
          />
        </div>
      </div>
      <div className={style.todoInputButton}>
        <button
          className={`${style.primaryBtn} ${style.addBtn}`}
          type="button"
          onClick={() => updateTodo({ title, description, todoId })}
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
    </div>
  );
};

export default EditForm;
