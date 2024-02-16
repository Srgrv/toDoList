import React, { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

//css
import "../PendingTodo.css";

//components
import EditForm from "../EditForm";
import PendingTodo from "../PendingTodo";

//extra-reducers
import { getPendingTodos } from "../../store/slices/toDoSlice";
import { SET_EDIT_TODO } from "../../store/slices/editTodoSlice";

const ListOfPendingTodos = React.memo(() => {
  const dispatch = useDispatch();

  const nodeRef = useRef(null);

  const pendingTodos = useSelector((state) => state.todos.pendingTodos);
  const editTodo = useSelector((state) => state.editTodo.editTodoId);

  useEffect(() => {
    dispatch(getPendingTodos());
  }, [dispatch]);

  console.log("render List Of");

  return (
    <TransitionGroup component="div">
      {pendingTodos.map((item) => {
        if (editTodo === item._id) {
          return (
            <CSSTransition
              // classNames={"pendingTodo"}
              classNames={"editForm"}
              nodeRef={nodeRef}
              in={Boolean(editTodo)}
              // key={item._id}
              key={editTodo}
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
              <EditForm
                key={item._id}
                cancel={() => dispatch(SET_EDIT_TODO(null))}
                todoId={item._id}
                title={item.title}
                description={item.description}
              />
            </CSSTransition>
          );
        } else {
          return (
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
              <PendingTodo item={item} />
            </CSSTransition>
          );
        }
      })}
    </TransitionGroup>
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
