import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { ITask } from "@/types";
import { cn } from "@/lib/utils";
// import { useAppDispatch } from "@/redux/hook";
// import {
//   toggleCompleteState,
// } from "@/redux/features/task/taskSlice";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/redux/api/baseApi";
import { UpdateTaskModal } from "./UpdateTaskModal";

export interface IProps {
  task: ITask;
}

const TaskCard = ({ task }: IProps) => {
  // const dispatch = useAppDispatch();
  const [deleteTask, {isLoading}] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleCheckboxChange = async () => {
    try {
      await updateTask({ id: task._id, isCompleted: !task.isCompleted }).unwrap();
      console.log("Task status updated successfully");
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  if (isLoading){
    return <div>Loading...</div>
  }

  return (
    <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className={cn("size-3 rounded-full", {
              "bg-green-500": task.priority === "Low",
              "bg-yellow-500": task.priority === "Medium",
              "bg-red-500": task.priority === "High",
            })}
          ></div>
          <h1 className={cn({ "line-through": task.isCompleted })}>
            {task.title}
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          <UpdateTaskModal task={task}/>
          <Button
            onClick={() => deleteTask(task._id)}
            variant="link"
            className="p-0 text-red-500"
          >
            <Trash2 />
          </Button>
          <Checkbox
            checked={task.isCompleted}
            onClick={handleCheckboxChange}
          />
        </div>
      </div>
      <p className="mt-5">{task.description}</p>
    </div>
  );
};

export default TaskCard;
