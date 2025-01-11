import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";

import { RootState } from "@/redux/store";

import { IUser } from "@/types";

interface InitialState {
    users: IUser[];
}

const initialState: InitialState = {
    users: []
}

type DraftUser = Pick<IUser, "name">;

const createUser = (userData: DraftUser): IUser => {
    return { id: nanoid(), ...userData }
};

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            addUser: (state, action: PayloadAction<IUser>) => {
                const userData = createUser(action.payload);
                state.users.push(userData)
            },
            removeUser: (state, action: PayloadAction<string>) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            },
        }
    }
);

export const selectUsers = (state: RootState)=>state.user.users;

export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;