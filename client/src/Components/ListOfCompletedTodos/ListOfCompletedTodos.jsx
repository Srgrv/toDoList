import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TransitionGroup, CSSTransition } from "react-transition-group";

//css
import classes from "../List.module.css";
import "../PendingTodo.css";

//icons
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

//extra-reducers
import { GET_COMPLETED_TODOS, REMOVE_TODO } from "../../store/slices/toDoSlice";

//components
import CompletedTodo from "../CompletedTodo";

const ListOfCompletedTodos = () => {
  const dispatch = useAppDispatch();
  const completedTodos = useAppSelector((state) => state.todos.completedTodos);

  useEffect(() => {
    dispatch(GET_COMPLETED_TODOS());
  }, [dispatch]);

  return (
    <TransitionGroup component="div">
      {completedTodos.map((item, index) => (
        <CSSTransition
          classNames={"pendingTodo"}
          key={item._id}
          timeout={600}
          mountOnEnter
          unmountOnExit
          onEnter={() => console.log("onEnter")}
          onEntered={() => console.log("onEntered")}
          onEntering={() => console.log("onEntering")}
          onExit={() => console.log("onExit")}
          onExited={() => console.log("onExited")}
          onExiting={() => console.log("onExiting")}
        >
          <CompletedTodo
            key={item._id}
            item={item}
            icon={
              <AiOutlineDelete
                title="Delete?"
                className={classes.icon}
                onClick={() => dispatch(REMOVE_TODO(item._id))}
              />
            }
            checkIcon={<FaCheck className={classes.checkIcon} />}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default ListOfCompletedTodos;
