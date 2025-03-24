"use client";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Task } from "@/types";
import { checkTask, deleteTask, getAllTasks, updateTask } from "@/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import AlertBox from "./AlertBox";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      setIsLoading(true);
      const { tasks: fetchedTasks, error: fetchError } = await getAllTasks();

      if (fetchError) {
        setError(fetchError);
        setIsLoading(false);
        return;
      }

      setTasks(fetchedTasks || []);
      setIsLoading(false);
    }

    fetchTasks();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleCheckboxClick = async (id: number) => {
    const { error } = await checkTask({ id });

    if (error) {
      setError(error);
      return;
    }

    setAlertMessage("Task status updated!");
    setShowAlert(true);
  };

  const handleUpdate = async (id: number, title: string) => {
    const { error} = await updateTask({ id, title });

    if (error) {
      setError(error);
      return;
    }

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, title } : task))
    );
    setAlertMessage("Task updated successfully!");
    setShowAlert(true);
  };

  const handleDelete = async (id: number) => {
    const { error } = await deleteTask({ id });

    if (error) {
      setError(error);
      return;
    }

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setAlertMessage("Task deleted successfully!");
    setShowAlert(true);
  };

  return (
    <>
      {tasks?.map((task) => (
        <div className="w-full py-2 space-y-2 mt-6 flex justify-between px-12" key={task.id}>
          <div className="place-items-center flex space-x-4">
            <Checkbox onClick={() => handleCheckboxClick(task.id)} />
            <p className="">{task.title}</p>
          </div>

          <div className="flex space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-0 shadow-xl hover:bg-gray-300 hover:rounded-lg hover:cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#574ef0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-pencil"
                  >
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Task</DialogTitle>
                  <DialogDescription>
                    Edit the title of your task.
                  </DialogDescription>
                </DialogHeader>
                <Input
                  defaultValue={task.title}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <DialogFooter>
                  <DialogClose>
                  <Button
                    className="primary-button"
                    onClick={() => handleUpdate(task.id, updatedTitle)}
                  >
                    Update
                  </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-0 shadow-xl hover:bg-gray-300 hover:rounded-lg hover:cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f54747"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-trash"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Task</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this task?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose>
                    <Button className="primary-button">No</Button>
                  </DialogClose>
                  <Button
                    className="bg-[#f54747]"
                    onClick={() => handleDelete(task.id)}
                  >
                    Yes, I am sure
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
      <AlertBox open={showAlert} onOpenChange={setShowAlert} title={alertMessage}/>
    </>
  );
}