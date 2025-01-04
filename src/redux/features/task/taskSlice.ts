import { RootState } from "@/redux/store";
import { ITask } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    tasks : ITask[];
    filter : 'All' | 'High' | 'Medium' | 'Low' ;
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
        priority: 'High',
    }],
    filter: 'All'
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {}
})

export const selectTasks  = (state: RootState) => {
    return state.toDo.tasks;
}
export const selectFilter  = (state: RootState) => {
    return state.toDo.filter;
}

export default taskSlice.reducer;