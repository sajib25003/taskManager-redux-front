import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import taskReducer from './features/task/taskSlice';
import userReducer from './features/users/userSlice';
import { baseApi } from './api/baseApi';
// import logger from './middlewares/logger';


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        toDo: taskReducer,
        user: userReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

