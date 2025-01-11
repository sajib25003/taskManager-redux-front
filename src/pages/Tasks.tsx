import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectTasks, updateFilter } from "@/redux/features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const Tasks = () => {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  // const filters = useAppSelector(selectFilter)

  // console.log(tasks);

  return (
    <div className="mx-auto max-w-7xl px-5 mt-20">
      <div className="flex justify-end items-center">
        <h1 className="mr-auto text-2xl font-bold">Tasks</h1>
        <Tabs>
          <TabsList defaultValue={"all"}>
            <TabsTrigger onClick={()=> {dispatch(updateFilter("All"))}} value="All">All</TabsTrigger>
            <TabsTrigger onClick={()=> {dispatch(updateFilter("Low"))}} value="Low">Low</TabsTrigger>
            <TabsTrigger onClick={()=> {dispatch(updateFilter("Medium"))}} value="Medium">Medium</TabsTrigger>
            <TabsTrigger onClick={()=> {dispatch(updateFilter("High"))}} value="High">High</TabsTrigger>
          </TabsList>
        </Tabs>
        <AddTaskModal />
      </div>
      <div className="space-y-5 mt-5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
