import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from 'lucide-react';
import { ITask } from "@/types";


const TaskCard = ({task}: { task: ITask }) => {
    return (
        <div className="border px-5 py-3 rounded-md">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <div className="size-3 rounded-full bg-green-500"></div>
                    <h1>{task.title}</h1>
                </div>
                <div className="flex gap-3 items-center">
                    <Button variant="link" className="p-0 text-red-500">
                        <Trash2/>
                    </Button>
                    <Checkbox/>
                </div>
            </div>
            <p className="mt-5">{task.description}</p>
        </div>
    );
};

export default TaskCard;