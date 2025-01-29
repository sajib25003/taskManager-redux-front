import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
// import { useAppDispatch } from "@/redux/hook";
// import { addTask } from "@/redux/features/task/taskSlice";
// import { ITask } from "@/types";
import { useState } from "react";
import { useUpdateTaskMutation } from "@/redux/api/baseApi";
import { FaEdit } from "react-icons/fa";
import { IProps } from "./TaskCard";

export function UpdateTaskModal({ task }: IProps) {
  const [open, setOpen] = useState(false);
  const form = useForm();
  // const dispatch = useAppDispatch();

  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // console.log("data", data);
  // console.log("loadedData", task);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const updatedData = {
      ...data,
      isCompleted: false,
    };

    try {
      await updateTask({ id: task._id, ...updatedData }).unwrap();

      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };
  // const onSubmit = (data) => {
  //   dispatch(addTask(data))
  // };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 text-green-500 text-3xl">
          <FaEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogDescription className="sr-only">
          Update the task!
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-end gap-3 space-x-2">
          <div className="w-full flex-1 gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="title"
                  defaultValue={task.title} 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  defaultValue={task.description} 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dueDate"
                  defaultValue={task.dueDate} 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              //   disabled={(date) =>
                              //     date > new Date() ||
                              //     date < new Date("1900-01-01")
                              //   }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  defaultValue={task.priority} 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Priority</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter className="sm:justify-start">
                  <Button type="submit" size="sm" className="px-3 w-14 mt-5">
                    <span className="">Update</span>
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
