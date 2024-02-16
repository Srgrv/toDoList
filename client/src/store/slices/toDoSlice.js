import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const getPendingTodos = createAsyncThunk(
  "toDo/getPendingTodos",
  async () => {
    try {
      const { data } = await axios.get("/todos/getPendingTodos");
      return data;
    } catch (error) {
      console.log(
        `Произошла ошибка при получении задач, находящихся в ожидании, ошибка: ${error}`
      );
    }
  }
);

export const GET_COMPLETED_TODOS = createAsyncThunk(
  "toDo/GET_COMPLETED_TODOS",
  async () => {
    try {
      const { data } = await axios.get("/todos/getCompletedTodos");
      return data;
    } catch (error) {
      console.log(
        `Произошла ошибка при получении выполненных, ошибка: ${error}`
      );
    }
  }
);

export const createTodo = createAsyncThunk(
  "toDo/createTodo",
  async ({ title, description }) => {
    try {
      const { data } = await axios.post("/todos/createToDo", {
        title,
        description,
      });
      return data;
    } catch (error) {
      console.log(`Произошла ошибка при создании задачи`);
    }
  }
);

export const UPDATE_TODO = createAsyncThunk(
  "UPDATE_TODO/updateTodo",
  async ({ titleInput, descriptionInput, todoId }) => {
    debugger;
    try {
      const { data } = await axios.put("/todos/updateTodo", {
        titleInput,
        descriptionInput,
        todoId,
      });
      return data;
    } catch (error) {
      console.log(`Произошла ошибка при обновлении задачи`);
    }
  }
);

export const REMOVE_TODO = createAsyncThunk(
  "toDo/REMOVE_TODO",
  async (todoId) => {
    try {
      const { data } = await axios.delete(`/todos/removeTodo/${todoId}`);
      return data;
    } catch (error) {
      console.log(`Произошла ошибка при запросе на удаление: ${error}`);
    }
  }
);

export const COMPLETE_TODO = createAsyncThunk(
  "toDo/COMPLETE_TODO",
  async (todoId) => {
    try {
      const { data } = await axios.put("/todos/completeTodo", { todoId });
      return data;
    } catch (error) {
      console.log(`Произошла ошибка при завершении задачи: ${error}`);
    }
  }
);

export const INCOMPLETE_TODO = createAsyncThunk(
  "toDo/INCOMPLETE_TODO",
  async (todoId) => {
    try {
      const { data } = await axios.put("/todos/incompleteTodo", { todoId });
      return data;
    } catch (error) {
      console.log(
        `Произошла ошибка обновления статуса на "ожидает выполнения": ${error}`
      );
    }
  }
);

const initialState = {
  isCompletedScreen: false,
  pendingTodos: [],
  inProcessTodos: [],
  completedTodos: [],
  isLoading: false,
  message: null,
};

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    TOGGLE_IS_COMPLETE_SCREEN: (state, action) => {
      state.isCompletedScreen = action.payload;
    },
  },
  extraReducers: (build) => {
    //-----------------------------------------------------------getPendingTodos
    build.addCase(getPendingTodos.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(getPendingTodos.fulfilled, (state, action) => {
      state.pendingTodos = action.payload.todos;

      // const _oldPendingTodos = state.pendingTodos;
      // const _newPendingTodos = action.payload.todos;

      const newPendingTodos = state.pendingTodos.filter(
        (newTodo) =>
          !state.pendingTodos.some((oldTodo) => oldTodo._id === newTodo._id)
      );
      state.pendingTodos.unshift(...newPendingTodos);

      state.message = action.payload.message;
      state.isLoading = false;
    });
    build.addCase(getPendingTodos.rejected, (state, action) => {
      state.isLoading = true;
      state.message = action.payload.message;
    });
    //-----------------------------------------------------------GET_COMPLETED_TODOS
    build.addCase(GET_COMPLETED_TODOS.pending, (state, action) => {
      state.isLoading = true;
    });
    build.addCase(GET_COMPLETED_TODOS.fulfilled, (state, action) => {
      state.completedTodos = action.payload.todos;
      state.message = action.payload.message;
      state.isLoading = false;
    });
    build.addCase(GET_COMPLETED_TODOS.rejected, (state, action) => {
      state.isLoading = true;
      state.message = action.payload.message;
    });
    //-----------------------------------------------------------createTodo
    build.addCase(createTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    build.addCase(createTodo.fulfilled, (state, action) => {
      state.pendingTodos.unshift(action.payload.newToDo);
      state.message = action.payload.message;
      state.isLoading = false;
    });
    build.addCase(createTodo.rejected, (state, action) => {
      state.isLoading = true;
      state.message = action.payload.message;
    });
    //-----------------------------------------------------------removeTodo
    build.addCase(REMOVE_TODO.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(REMOVE_TODO.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.completedTodos = state.completedTodos.filter(
        (todo) => todo._id !== action.payload.todoId
      );
      state.pendingTodos = state.pendingTodos.filter(
        (todo) => todo._id !== action.payload.todoId
      );
      state.isLoading = false;
    });
    build.addCase(REMOVE_TODO.rejected, (state, action) => {
      state.isLoading = true;
      state.message = action.payload.message;
    });
    //-----------------------------------------------------------updateTodo
    build.addCase(UPDATE_TODO.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(UPDATE_TODO.fulfilled, (state, action) => {
      debugger;
      state.pendingTodos = state.pendingTodos.map((todo) => {
        if (todo._id === action.payload.todo._id) {
          return action.payload.todo;
        } else {
          return todo;
        }
      });

      state.message = action.payload.message;
      state.isLoading = false;
    });
    build.addCase(UPDATE_TODO.rejected, (state, action) => {
      state.isLoading = true;
      state.message = action.payload.message;
    });
    //-----------------------------------------------------------completeTodo
    build.addCase(COMPLETE_TODO.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(COMPLETE_TODO.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.pendingTodos = state.pendingTodos.filter(
        (todo) => todo._id !== action.payload.todo._id
      );
      state.isLoading = false;
    });
    build.addCase(COMPLETE_TODO.rejected, (state, action) => {
      state.isLoading = true;
      state.message = action.payload.message;
    });
    //-----------------------------------------------------------INCOMPLETE_TODO
    build.addCase(INCOMPLETE_TODO.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(INCOMPLETE_TODO.fulfilled, (state, action) => {
      debugger;
      state.message = action.payload.message;
      state.completedTodos = state.completedTodos.filter(
        (todo) => todo._id !== action.payload.todo._id
      );
      state.isLoading = false;
    });
    build.addCase(INCOMPLETE_TODO.rejected, (state, action) => {
      state.isLoading = true;
      state.message = action.payload.message;
    });
  },
});

export const { TOGGLE_IS_COMPLETE_SCREEN } = toDoSlice.actions;
export default toDoSlice.reducer;

//сделал удаление задачи, нужно теперь сделать редактирование задачи, как в видео, при нажатии на edit нужно сделать так чтобы на месте задачи вышел такой же компонент для редактироваения  как в шапке для добавления
