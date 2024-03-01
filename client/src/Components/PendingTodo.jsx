import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "../hooks/hooks";

//css
import style from "./PendingTodo.module.css";
import "./PendingTodo.css";

import classes from "./List.module.css";

//icon
import { MdModeEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

//reducers
import { SET_EDIT_TODO } from "../store/slices/editTodoSlice";

//extra-reducers
import { REMOVE_TODO } from "../store/slices/toDoSlice";

//components
import CustomCheckbox from "./CustomCheckbox";

const PendingTodo = React.memo((props) => {
  const dispatch = useAppDispatch();

  const prevItem = useRef(props.item);
  const prevClassName = useRef(props.className);

  // console.log(`${props.item.title}`);

  useEffect(() => {
    if (prevItem.current.title !== props.item.title) {
      console.log(`${props.item.title}: item изменились`);
    }

    if (prevClassName.current !== props.className) {
      console.log(`${props.item.title}: className изменились`);
    }
  });

  return (
    <div className={style.todoListItem}>
      <div className={style.todoListItem_wrapper}>
        <div>
          <CustomCheckbox
            checked={props.item.checked}
            id={props.item._id}
            status={props.item.status}
            // handleCheckboxChange={handleCheckboxChange}
          />
        </div>

        <div className={style.todo}>
          <h3>{props.item.title}</h3>
          <p>{props.item.description}</p>
        </div>

        <div>
          <MdModeEdit
            className={classes.icon}
            onClick={() => dispatch(SET_EDIT_TODO(props.item._id))}
          />
        </div>

        <div>
          <AiOutlineDelete
            className={classes.icon}
            title="Delete?"
            onClick={() => dispatch(REMOVE_TODO(props.item._id))}
          />
        </div>
      </div>
    </div>
  );
});

export default PendingTodo;
