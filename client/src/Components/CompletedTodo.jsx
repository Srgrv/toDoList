import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

//css
import style from "./PendingTodo.module.css";

//icon
import { FaCheck } from "react-icons/fa";

//components
import CustomCheckbox from "./CustomCheckbox";

const CompletedTodo = (props, { item, icon, checkIcon }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={style.todoListItem}>
      <div className={style.todoListItem_wrapper}>
        <div>
          {/* <FaCheck /> */}
          {/* {checkIcon} */}
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
        <div>{props.icon}</div>
      </div>
    </div>
  );
};

export default CompletedTodo;
