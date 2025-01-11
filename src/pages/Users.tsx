import AddUserModal from "@/components/module/tasks/AddUserModal";
import UserCard from "@/components/module/tasks/UserCard";
import { selectUsers } from "@/redux/features/users/userSlice";
import {  useAppSelector } from "@/redux/hook";

const Users = () => {
    const users = useAppSelector(selectUsers);
    return (
        <div className="mx-auto max-w-7xl px-5 mt-20">
      <div className="flex justify-end items-center">
        <h1 className="mr-auto text-2xl font-bold">Users</h1>
        
        <AddUserModal />
      </div>
      <div className="space-y-5 mt-5">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
    );
};

export default Users;