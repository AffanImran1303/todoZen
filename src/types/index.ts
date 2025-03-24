export interface Task{
    id:number;
    title:string;
    completed:boolean;
}
export type AddNewTaskTypes={
    title:string;
}

export type TaskType={
    task?:Task[];
}
export interface UpdateTaskButtonProps {
    taskId: number;
    initialTitle: string;
    onUpdateSuccess: () => void;
  }
export interface AlertboxProps{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
}

export interface AddNewTaskComponentProps{
    onTaskAdded:(newTask:Task)=>void;
}