import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTasksQuery } from "@/redux/api/baseApi";
// import { updateFilter } from "@/redux/features/task/taskSlice";
// import { useAppDispatch } from "@/redux/hook";
import { ITask } from "@/types";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  // const tasks = useAppSelector(selectTasks);
  // const dispatch = useAppDispatch();
  // const filters = useAppSelector(selectFilter)

  const navigate = useNavigate();

 
  const [activeTab, setActiveTab] = useState<"All" | "Completed" | "Pending">(
    "All"
  );

  const token = localStorage.getItem("token");
  let userId = "";

  if (token) {
    const decoded = jwtDecode<{ _id: string }>(token);

    // console.log(decoded, "decoded");
    userId = decoded._id;
  } else {
    navigate("/login")
  }

  const { data, isLoading } = useGetTasksQuery({ userId }, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const filteredTasks = data?.tasks.filter((task: ITask) => {
    if (activeTab === "All") return true;
    if (activeTab === "Completed") return task.isCompleted === true;
    if (activeTab === "Pending") return task.isCompleted === false;
    return true;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log({ data, isLoading });

  // console.log(tasks);

  return (
    <div className="mx-auto max-w-7xl px-5 mt-3">
      <div className="flex justify-end items-center flex-col md:flex-row">
        <h1 className="mr-auto text-lg md:text-2xl lg:text-3xl font-bold">Tasks</h1>
        <Tabs className="mr-2 flex items-center gap-2">
          <TabsList defaultValue="All">
            <TabsTrigger onClick={() => setActiveTab("All")} value="All">
              All
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setActiveTab("Completed")}
              value="Completed"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setActiveTab("Pending")}
              value="Pending"
            >
              Pending
            </TabsTrigger>
          </TabsList>
        <AddTaskModal />
        </Tabs>
      </div>
      <div className="space-y-5 mt-5">
        {filteredTasks?.length ? (
          filteredTasks.map((task: ITask, idx: number) => (
            <TaskCard key={task._id || idx} task={task} />
          ))
        ) : (
          <div>No tasks to display.</div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
