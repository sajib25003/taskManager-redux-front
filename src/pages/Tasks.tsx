import { AddTaskModal } from "@/components/module/tasks/AddTAskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import {  selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";

const Tasks = () => {
    const tasks = useAppSelector(selectTasks)
    // const filters = useAppSelector(selectFilter)
    
    // console.log(tasks);
    
    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
            <div className="flex justify-between items-center">
                <h1>Tasks</h1>
                <AddTaskModal/>
            </div>
            <div className="space-y-5 mt-5">
                {
                    tasks.map((task) => (<TaskCard key={task.id} task={task} />)
                        
                    )
                }
                
            </div>
        </div>
    );
};

export default Tasks;