import React, { ReactNode } from "react";

//css
import style from "./PendingTodo.module.css";

//components
import CustomCheckbox from "./CustomCheckbox";

//intefaces&types
import { ICompletedTodo } from "../store/slices/toDoSlice";

interface IProps {
  key: string;
  item: ICompletedTodo;
  icon: () => ReactNode;
}

const CompletedTodo: React.FC<IProps> = (props) => {
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
        <div>{props.icon()}</div>
      </div>
    </div>
  );
};

export default CompletedTodo;
