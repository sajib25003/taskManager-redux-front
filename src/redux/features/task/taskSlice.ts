import { RootState } from "@/redux/store";
import { ITask } from "@/types";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

interface InitialState {
    tasks: ITask[];
    filter: 'All' | 'High' | 'Medium' | 'Low';
}

const initialState: InitialState = {
    tasks: [{
        id: "abc",
        title: 'Initialize frontend',
        description: 'Create Home Page & Routing',
        dueDate: '2025-11',
        isCompleted: true,
        priority: 'High',
    },
    {
        id: "def",
        title: 'Github Repo',
        description: 'Create HGithub Repo',
        dueDate: '2025-11',
        isCompleted: false,
        priority: 'Medium',
    }],
    filter: 'All'
};

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;
const createTask = (taskData: DraftTask): ITask => {
    return { id: nanoid(), isCompleted: false, ...taskData }
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
                if (task.id === action.payload) {
                    task.isCompleted = !task.isCompleted;
                }
            })
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        updateFilter: (state, action: PayloadAction<"High" | "Medium" | "Low" | "All">) => {
            state.filter = action.payload;
        },
    }
})

export const selectTasks = (state: RootState) => {
    const filter = state.toDo.filter;
    if (filter === "Low"){
        return state.toDo.tasks.filter(task => task.priority === "Low");
    } else if (filter === "Medium"){
        return state.toDo.tasks.filter(task => task.priority === "Medium");
    } else if (filter === "High"){
        return state.toDo.tasks.filter(task => task.priority === "High");
    } else if (filter === "All"){
        return state.toDo.tasks;
    }
}
export const selectFilter = (state: RootState) => {
    return state.toDo.filter;
}

export const { addTask, toggleCompleteState, deleteTask, updateFilter } = taskSlice.actions;

export default taskSlice.reducer;