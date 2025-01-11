import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import taskReducer from './features/task/taskSlice';
import userReducer from './features/users/userSlice';
// import logger from './middlewares/logger';


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        toDo: taskReducer,
        user: userReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

