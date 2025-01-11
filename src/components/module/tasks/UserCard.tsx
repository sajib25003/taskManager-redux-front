import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {  IUser } from "@/types";
import { useAppDispatch } from "@/redux/hook";
import { removeUser } from "@/redux/features/users/userSlice";

interface IProps {
  user: IUser;
}
const UserCard = ({ user }: IProps) => {
    const dispatch = useAppDispatch();
    return (
        <div className="border px-5 py-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          
          <h1>
            {user.name}
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            onClick={() => dispatch(removeUser(user.id))}
            variant="link"
            className="p-0 text-red-500"
          >
            <Trash2 />
          </Button>
          
        </div>
      </div>
      
    </div>
    );
};

export default UserCard;