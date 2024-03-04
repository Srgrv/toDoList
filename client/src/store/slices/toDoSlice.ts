import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Action,
} from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { AxiosError } from "axios";

export interface IProps {
  title: string;
  description: string;
}

export interface ITodo extends IProps {
  _id: string;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPendingTodo extends ITodo {
  status: "ожидает выполнения";
}

export interface ICompletedTodo extends ITodo {
  status: "выполнен";
}

export interface IResponse {
  message: string;
}

export interface ISuccessResponseWithPendingTodos extends IResponse {
  todos: IPendingTodo[];
}

export interface ISuccessResponseWithCompletedTodos extends IResponse {
  todos: ICompletedTodo[];
}

interface ISuccessResponseWithCompleteTodo extends IResponse {
  todo: ICompletedTodo;
}

interface ISuccessResponseWithPendingTodo extends IResponse {
  todo: IPendingTodo;
}

type TBackendResponseWithPendingTodo =
  | ISuccessResponseWithPendingTodo
  | ErrorResponse;

type TBackendResponseWithCompleteTodo =
  | ISuccessResponseWithCompleteTodo
  | ErrorResponse;

interface ErrorResponse extends IResponse {
  error: string;
}

type TBackendResponseWithPendingTodos =
  | ISuccessResponseWithPendingTodos
  | ErrorResponse;

type TBackendResponseWithCompletedTodos =
  | ISuccessResponseWithCompletedTodos
  | ErrorResponse;

export const getPendingTodos = createAsyncThunk<
  TBackendResponseWithPendingTodos,
  undefined,
  { rejectValue: ErrorResponse }
>("toDo/getPendingTodos", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<TBackendResponseWithPendingTodos>(
      "https://mern-todo-1huw.onrender.com/todos/getPendingTodos"
    );

    if ("error" in data) {
      return rejectWithValue(data);
    } else {
      return data;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(
      `Произошла ошибка при получении ожидающих выполнения задач, ошибка: ${axiosError.message}`
    );
    return rejectWithValue({
      error: "Произошла ошибка Axios",
      message: axiosError.message,
    });
  }
});

//--------------------------------------------------------------------------------getCompletedTodos

export const GET_COMPLETED_TODOS = createAsyncThunk<
  TBackendResponseWithCompletedTodos,
  undefined,
  { rejectValue: ErrorResponse }
>("toDo/GET_COMPLETED_TODOS", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<TBackendResponseWithCompletedTodos>(
      // нужно добавить тип возвращаемого объекта
      "https://mern-todo-1huw.onrender.com/todos/getCompletedTodos"
    );

    if ("error" in data) {
      return rejectWithValue(data);
    } else {
      return data;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(
      `Произошла ошибка при получении выполненных задач, ошибка: ${axiosError.message}`
    );
    return rejectWithValue({
      error: "Произошла ошибка Axios",
      message: axiosError.message,
    });
  }
});

//----------------------------------------------------------------------------createTodo

interface ISuccessResponseWithNewTodo extends IResponse {
  newToDo: IPendingTodo;
}

export const createTodo = createAsyncThunk<
  ISuccessResponseWithNewTodo,
  IProps,
  { rejectValue: ErrorResponse }
>("toDo/createTodo", async ({ title, description }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<ISuccessResponseWithNewTodo>(
      "https://mern-todo-1huw.onrender.com/todos/createToDo",
      {
        title,
        description,
      }
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(`Произошла ошибка при создании задачи`);

    return rejectWithValue({
      error: "Произошла ошибка Axios",
      message: axiosError.message,
    });
  }
});

//---------------------------------------------------------------------------------updateTodo
export interface IPropsUpdateTodo extends IProps {
  todoId: string;
}

interface IUpdateTodoBackendResponse {
  todo: IPendingTodo;
  message: string;
}

export const UPDATE_TODO = createAsyncThunk<
  IUpdateTodoBackendResponse,
  IPropsUpdateTodo,
  { rejectValue: ErrorResponse }
>(
  "UPDATE_TODO/updateTodo",
  async ({ title, description, todoId }, { rejectWithValue }) => {
    debugger;
    try {
      const { data } = await axios.put<IUpdateTodoBackendResponse>(
        "https://mern-todo-1huw.onrender.com/todos/updateTodo",
        {
          title,
          description,
          todoId,
        }
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(`Произошла ошибка при обновлении задачи`);
      return rejectWithValue({
        message: axiosError.message,
        error: "Произошла ошибка Axios",
      });
    }
  }
);

//----------------------------------------------------------------------------------removeTodo
interface ISuccesResponseFromDeleteTodo extends IResponse {
  todoId: IPendingTodo;
}

type TBackendResponseFromDeleteTodo =
  | ISuccesResponseFromDeleteTodo
  | ErrorResponse;

export const REMOVE_TODO = createAsyncThunk<
  ISuccesResponseFromDeleteTodo,
  string,
  { rejectValue: ErrorResponse }
>("toDo/REMOVE_TODO", async (todoId, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete<TBackendResponseFromDeleteTodo>(
      `https://mern-todo-1huw.onrender.com/todos/removeTodo/${todoId}`
    );

    if ("error" in data) {
      return rejectWithValue(data);
    } else {
      return data;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(`Произошла ошибка при запросе на удаление: ${error}`);
    return rejectWithValue({
      message: axiosError.message,
      error: "Произошла ошибка Axios",
    });
  }
});

export const COMPLETE_TODO = createAsyncThunk<
  TBackendResponseWithCompleteTodo,
  string,
  { rejectValue: ErrorResponse }
>("toDo/COMPLETE_TODO", async (todoId, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(
      "https://mern-todo-1huw.onrender.com/todos/completeTodo",
      { todoId }
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(
      `Произошла ошибка при завершении задачи: ${axiosError.message}`
    );
    return rejectWithValue({
      message: axiosError.message,
      error: "Произошла ошибка Axios",
    });
  }
});

export const INCOMPLETE_TODO = createAsyncThunk<
  TBackendResponseWithPendingTodo,
  string,
  { rejectValue: ErrorResponse }
>("toDo/INCOMPLETE_TODO", async (todoId, { rejectWithValue }) => {
  try {
    const { data } = await axios.put<TBackendResponseWithPendingTodo>(
      "https://mern-todo-1huw.onrender.com/todos/incompleteTodo",
      { todoId }
    );
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(
      `Произошла ошибка обновления статуса на "ожидает выполнения": ${axiosError.message}`
    );
    return rejectWithValue({
      message: axiosError.message,
      error: "Произошла ошибка Axios",
    });
  }
});

interface IInitialState {
  isCompletedScreen: boolean;
  pendingTodos: IPendingTodo[]; // Замените 'any' на конкретный тип, если это применимо
  // inProcessTodos: any[]; // Замените 'any' на конкретный тип, если это применимо
  completedTodos: ICompletedTodo[]; // Замените 'any' на конкретный тип, если это применимо
  isLoading: boolean;
  message: string | null; // Предполагается, что сообщение может быть строкой или null
}

const initialState: IInitialState = {
  isCompletedScreen: false,
  pendingTodos: [],
  // inProcessTodos: [],
  completedTodos: [],
  isLoading: false,
  message: null,
};

const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {
    TOGGLE_IS_COMPLETE_SCREEN: (state, action: PayloadAction<boolean>) => {
      // Добавил тип для action
      state.isCompletedScreen = action.payload;
    },
  },
  extraReducers: (build) => {
    //-----------------------------------------------------------getPendingTodos
    build.addCase(getPendingTodos.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(getPendingTodos.fulfilled, (state, action) => {
      const payload = action.payload as ISuccessResponseWithPendingTodos;

      if (payload.todos) {
        const newTodos = payload.todos.filter((newTodo) =>
          state.pendingTodos.every((oldTodo) => oldTodo._id !== newTodo._id)
        );

        state.pendingTodos = [...newTodos, ...state.pendingTodos];
      }

      // if (payload.todos) {
      //   state.pendingTodos = payload.todos;
      //   const newPendingTodos = state.pendingTodos.filter(
      //     (newTodo) =>
      //       !state.pendingTodos.some((oldTodo) => oldTodo._id === newTodo._id)
      //   );
      //   state.pendingTodos.unshift(...newPendingTodos);
      // }

      state.message = action.payload.message;
      state.isLoading = false;
    });
    // build.addCase(getPendingTodos.rejected, (state, action) => {
    //   const payload = action.payload as ErrorResponse;
    //   state.isLoading = true;
    //   state.message = payload.message;
    // });
    //-----------------------------------------------------------GET_COMPLETED_TODOS
    build.addCase(GET_COMPLETED_TODOS.pending, (state, action) => {
      state.isLoading = true;
    });
    build.addCase(GET_COMPLETED_TODOS.fulfilled, (state, action) => {
      const payload = action.payload as ISuccessResponseWithCompletedTodos;

      if (payload.todos) {
        const todos = payload.todos as ICompletedTodo[];
        state.completedTodos = todos;
      }

      state.message = action.payload.message;
      state.isLoading = false;
    });
    // build.addCase(GET_COMPLETED_TODOS.rejected, (state, action) => {
    //   const payload = action.payload as ErrorResponse;
    //   state.isLoading = true;
    //   state.message = payload.message;
    // });
    //-----------------------------------------------------------createTodo
    build.addCase(createTodo.pending, (state, action) => {
      state.isLoading = true;
    });
    build.addCase(createTodo.fulfilled, (state, action) => {
      const payload = action.payload as ISuccessResponseWithNewTodo;
      state.pendingTodos.unshift(action.payload.newToDo);
      state.message = action.payload.message;
      state.isLoading = false;
    });
    // build.addCase(createTodo.rejected, (state, action) => {
    //   state.isLoading = true;
    //   const payload = action.payload as ErrorResponse;

    //   state.message = payload.message;
    // });
    //-----------------------------------------------------------removeTodo
    build.addCase(REMOVE_TODO.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(REMOVE_TODO.fulfilled, (state, action) => {
      state.message = action.payload.message;
      const payload = action.payload as ISuccesResponseFromDeleteTodo;

      state.completedTodos = state.completedTodos.filter(
        (todo) => todo._id !== payload.todoId._id
      );
      state.pendingTodos = state.pendingTodos.filter(
        (todo) => todo._id !== payload.todoId._id
      );
      state.isLoading = false;
    });
    // build.addCase(REMOVE_TODO.rejected, (state, action) => {
    //   state.isLoading = true;
    //   const payload = action.payload as ErrorResponse;
    //   state.message = payload.message;
    // });
    //-----------------------------------------------------------updateTodo
    build.addCase(UPDATE_TODO.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(UPDATE_TODO.fulfilled, (state, action) => {
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
    // build.addCase(UPDATE_TODO.rejected, (state, action) => {
    //   state.isLoading = true;
    //   const payload = action.payload as ErrorResponse;
    //   state.message = payload.message;
    // });
    //-----------------------------------------------------------completeTodo
    build.addCase(COMPLETE_TODO.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(COMPLETE_TODO.fulfilled, (state, action) => {
      const payload = action.payload as ISuccessResponseWithCompleteTodo;
      state.message = payload.message;
      state.pendingTodos = state.pendingTodos.filter(
        (todo) => todo._id !== payload.todo._id
      );
      state.isLoading = false;
    });
    // build.addCase(COMPLETE_TODO.rejected, (state, action) => {
    //   state.isLoading = true;
    //   const payload = action.payload as ErrorResponse;
    //   state.message = payload.message;
    // });
    //-----------------------------------------------------------INCOMPLETE_TODO
    build.addCase(INCOMPLETE_TODO.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(INCOMPLETE_TODO.fulfilled, (state, action) => {
      state.message = action.payload.message;
      const payload = action.payload as ISuccessResponseWithPendingTodo;
      state.completedTodos = state.completedTodos.filter(
        (todo) => todo._id !== payload.todo._id
      );
      state.isLoading = false;
    });
    // build.addCase(INCOMPLETE_TODO.rejected, (state, action) => {
    //   state.isLoading = true;
    //   const payload = action.payload as ErrorResponse;
    //   state.message = payload.message;
    // });
    build.addMatcher(isError, (state, action: PayloadAction<ErrorResponse>) => {
      state.isLoading = true;
      // const payload = action.payload as ErrorResponse;
      state.message = action.payload.message;
    });
  },
});

const isError = (action: Action) => {
  return action.type.endsWith("rejected");
};

export const { TOGGLE_IS_COMPLETE_SCREEN } = toDoSlice.actions;
export default toDoSlice.reducer;

//сделал удаление задачи, нужно теперь сделать редактирование задачи, как в видео, при нажатии на edit нужно сделать так чтобы на месте задачи вышел такой же компонент для редактироваения  как в шапке для добавления
