import { RootState } from "@/redux/store";
import { ITask } from "@/types";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

interface InitialState {
    tasks: ITask[];
    filter: 'All' | 'Completed' | 'Pending';
}

const initialState: InitialState = {
    tasks: [],
    filter: 'All'
};

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;
const createTask = (taskData: DraftTask): ITask => {
    return { _id: nanoid(), isCompleted: false, ...taskData }
};
const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<DraftTask>) => {
            // const id = uuidv4();
            // const taskData = {
            //     ...action.payload, 
            //     id,
            //     isCompleted: false,
            // };
            const taskData = createTask(action.payload);
            state.tasks.push(taskData)
        },
        toggleCompleteState: (state, action: PayloadAction<string>) => {
            state.tasks.forEach(task => {
                if (task._id === action.payload) {
                    task.isCompleted = !task.isCompleted;
                }
            })
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        },
        updateFilter: (state, action: PayloadAction<"Completed" | "Pending" | "All">) => {
            state.filter = action.payload;
        },
        // updateFilter: (state, action: PayloadAction<"High" | "Medium" | "Low" | "All">) => {
        //     state.filter = action.payload;
        // },
    }
})

export const selectTasks = (state: RootState) => {
    const filter = state.toDo.filter;
    if (filter === "Completed"){
        return state.toDo.tasks.filter(task => task.isCompleted === true);
    } else if (filter === "Pending"){
        return state.toDo.tasks.filter(task => task.isCompleted === false);
    } else if (filter === "All"){
        return state.toDo.tasks;
    }
}
export const selectFilter = (state: RootState) => {
    return state.toDo.filter;
}

export const { addTask, toggleCompleteState, deleteTask, updateFilter } = taskSlice.actions;

export default taskSlice.reducer;