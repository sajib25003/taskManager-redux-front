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
        isCompleted: false,
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
        }
    }
})

export const selectTasks = (state: RootState) => {
    return state.toDo.tasks;
}
export const selectFilter = (state: RootState) => {
    return state.toDo.filter;
}

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;