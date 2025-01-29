import { ITask } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl:import.meta.env.VITE_BASE_URL_API || "http://localhost:4000/api", }),
    tagTypes: ["task"],
    endpoints: builder => ({
        getTasks: builder.query({
            query: ({ userId }) => `/tasks?userId=${userId}`,
            providesTags: ["task"],
        }),
        createTask: builder.mutation({
            query: (taskData) => ({
                url: "/tasks",
                method: "POST",
                body: taskData,
            }),
            invalidatesTags: ["task"],
        }),
        updateTask: builder.mutation<ITask, { id: string } & Partial<ITask>>({
            query: ({ id, ...patch }) => ({
                url: `/tasks/${id}`,
                method: "PATCH", 
                body: patch,
            }),
            invalidatesTags: ["task"], 
        }),
        deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["task"],
        }),
    }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = baseApi;