import React from "react";
import { useAppDispatch } from "../hooks/hooks";

//css
import style from "./PendingTodo.module.css";

import classes from "./List.module.css";

//components
import CustomCheckbox from "./CustomCheckbox";

//icons
import { AiOutlineDelete } from "react-icons/ai";

//intefaces&types
import { ICompletedTodo } from "../store/slices/toDoSlice";

//extra-reducers
import { REMOVE_TODO } from "../store/slices/toDoSlice";

interface IProps {
  item: ICompletedTodo;
}

const CompletedTodo: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <div className={style.todoListItem}>
      <div className={style.todoListItem_wrapper}>
        <div>
          <CustomCheckbox
            checked={props.item.checked}
            id={props.item._id}
            status={props.item.status}
          />
        </div>
        <div className={style.todo}>
          <h3>{props.item.title}</h3>
          <p>{props.item.description}</p>
        </div>
        <div>
          <AiOutlineDelete
            title="Delete?"
            className={classes.icon}
            onClick={() => dispatch(REMOVE_TODO(props.item._id))}
          />
        </div>
      </div>
    </div>
  );
};

export default CompletedTodo;
