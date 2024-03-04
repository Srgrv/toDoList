import React, { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TransitionGroup, CSSTransition } from "react-transition-group";

//hooks
import { useMatchMedia } from "../../hooks/use-match-media";

//css
import "../PendingTodo.css";
import classes from "./ListOfPendingTodos.module.css";

//components
import EditForm from "../EditForm";
import PendingTodo from "../PendingTodo";

//extra-reducers
import { getPendingTodos } from "../../store/slices/toDoSlice";
import { SET_EDIT_TODO } from "../../store/slices/editTodoSlice";

const ListOfPendingTodos: React.FC = React.memo(() => {
  const { isMobile, isPhone, isTablet, isLaptop, isDesktop } = useMatchMedia();

  const dispatch = useAppDispatch();

  const pendingTodos = useAppSelector((state) => state.todos.pendingTodos);
  const editTodo = useAppSelector((state) => state.editTodo.editTodoId);

  useEffect(() => {
    dispatch(getPendingTodos());
  }, [dispatch]);

  {
    isMobile && console.log(`isMobile: ${isMobile}`);
    isPhone && console.log(`isPhone: ${isPhone}`);
    isTablet && console.log(`isTablet: ${isTablet}`);
    isLaptop && console.log(`isLaptop: ${isLaptop}`);
    isDesktop && console.log(`isDesktop: ${isDesktop}`);
  }

  return (
    <div className={classes.wrapper}>
      <TransitionGroup className={classes.transitionGroup}>
        {pendingTodos.map((item) => {
          if (editTodo === item._id) {
            return (
              <EditForm
                key={item._id}
                cancel={() => dispatch(SET_EDIT_TODO(null))}
                todoId={item._id}
                titleInput={item.title}
                descriptionInput={item.description}
              />
            );
          } else {
            return (
              <CSSTransition
                classNames={"pendingTodo"}
                key={item._id}
                timeout={600}
                mountOnEnter
                unmountOnExit
                // onEnter={() => console.log("onEnter")}
                // onEntered={() => console.log("onEntered")}
                // onEntering={() => console.log("onEntering")}
                // onExit={() => console.log("onExit")}
                // onExited={() => console.log("onExited")}
                // onExiting={() => console.log("onExiting")}
              >
                <PendingTodo item={item} />
              </CSSTransition>
            );
          }
        })}
      </TransitionGroup>
    </div>
  );
});

//   return (
//     <TransitionGroup component="div">
//       {pendingTodos.map((item) => (
//         <CSSTransition
//           // classNames="pendingTodo"
//           classNames={editTodo === item._id ? "editForm" : "pendingTodo"}
//           key={item._id}
//           timeout={600}
//           onEnter={() => console.log("onEnter")}
//           onEntered={() => console.log("onEntered")}
//           onEntering={() => console.log("onEntering")}
//           onExit={() => console.log("onExit")}
//           onExited={() => console.log("onExited")}
//           onExiting={() => console.log("onExiting")}
//         >
//           {editTodo === item._id ? (
//             <EditForm
//               key={item._id}
//               cancel={() => dispatch(SET_EDIT_TODO(null))}
//               todoId={item._id}
//               title={item.title}
//               description={item.description}
//             />
//           ) : (
//             <PendingTodo item={item} />
//           )}
//         </CSSTransition>
//       ))}
//     </TransitionGroup>
//   );
// });

export default ListOfPendingTodos;
