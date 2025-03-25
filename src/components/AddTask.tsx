"use client";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { addTask } from "@/actions";
import AlertBox from "./AlertBox";
import { UserIsLoggedInProps } from "@/types";

const AddNewTaskComponent:React.FC<UserIsLoggedInProps> = ({userId}) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  async function addNewTask() {
    setIsLoading(true);
    const result = await addTask({
      title,
    });
    setIsLoading(false);
    if (result.error) {
      setError(result.error);
      setAlertMessage(result.error);
      setShowAlert(true);
      return;
    }
    setTitle("");
    setAlertMessage("Task added successfully!");
    setShowAlert(true);
  }

  if(!userId){
    return(
      <div>
        <p className="text-[#574ef0]">Please Sign in to continue.</p>
      </div>
    )
  }
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error:{error}</div>}
      <div className="w-full space-y-4 lg:flex justify-between space-x-6 place-self-start">
        <Input
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow-2xl lg:w-75"
        ></Input>
        <Button className="shadow-2xl w-full primary-button lg:w-50" onClick={addNewTask}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add Task
        </Button>
      </div>
      <AlertBox open={showAlert} onOpenChange={setShowAlert} title={alertMessage}/>
    </div>
  );
};

export default AddNewTaskComponent;