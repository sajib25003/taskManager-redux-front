export interface ITask {
    _id:string,
    title: string,
    description: string,
    dueDate: string,
    isCompleted: boolean,
    priority: 'High' | 'Medium' | 'Low',
    userId: string,
}

export interface IUser {
    id:string,
    name: string,
}