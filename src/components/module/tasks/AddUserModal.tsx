import { Button } from "@/components/ui/button";
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

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hook";
import { IUser } from "@/types";
import { addUser } from "@/redux/features/users/userSlice";

const AddUserModal = () => {
  const form = useForm();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(addUser(data as IUser));
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-green-300">
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogDescription className="sr-only">
          Fill up the form to add User!
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>Add A New User</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-end gap-3 space-x-2">
          <div className="w-full flex-1 gap-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                
                
                <DialogFooter className="sm:justify-start">
                  <Button type="submit" size="sm" className="px-3 w-14 mt-5">
                    <span className="">Add</span>
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
