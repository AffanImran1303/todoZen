'use server';
import { db } from "@/lib/database";
import { AddNewTaskTypes} from "@/types";
import { auth } from "@clerk/nextjs/server";

export async function addTask({}:AddNewTaskTypes){
    try{
        const {userId} = await auth();
        if(!userId) return {error:"Not Authenticated"};

        return {success: "Task Added Successfully"};
    }catch(error){
        console.log("Error while adding new task:",error);
        return {error:"Something went wrong"};
    }
}

export async function getAllTasks(){
    try{
        const {userId}=await auth();

        if(!userId){
             return {error:"Please SignIn with your Account to see your Tasks"}
        };

        const tasks=await db.task.findMany({
            where:{
                userId,
            },
            orderBy:{
                createdAt:"desc",
            }
        });
        return {tasks};
    }catch (error){
        console.log("Error while fetching All Tasks:",error);
        return {error:"Something went wrong"};
    }
}

export async function checkTask({id}:{id:number}){
    try{
        const {userId}=await auth();

        if(!userId) return {error:"Not Authenticated"};

        const isTheUser_Owner=await db.task.findFirst({
            where:{
                id,
                userId,
            },
        });

        if(!isTheUser_Owner) return {error:"Not Authenticated"};

        await db.task.update({
            where:{
                id,
                userId,
            },
            data:{
                completed:!isTheUser_Owner.completed,
            }
        });

        return {success:"Task Marked Successfully"};
    }catch (error){
        console.log("Error while marking task:",error)
        return {error:"Something went wrong"};
    }
}

export async function updateTask({id,title,}: {id: number; title: string;}) {
    try {
      const { userId } = await auth();
  
      if (!userId) {
        return { error: "Not Authenticated" };
      }
  
      const isTheUser_Owner = await db.task.findFirst({
        where: {
          id,
          userId,
        },
      });
  
      if (!isTheUser_Owner) {
        return { error: "Not Authenticated" };
      }
  
      await db.task.update({
        where: {
          id,
          userId,
        },
        data: {
          title: title,
        },
      });
  
      return { success: "Task Updated Successfully" };
    } catch (error) {
      console.error("Error updating task:", error);
      return { error: "Something went wrong" };
    }
  }


export async function deleteTask({id}:{id:number}){
    try{
        const {userId}=await auth();

        if(!userId) return {error:"Not Authenticated"};

        const isTheUser_Owner=await db.task.findFirst({
            where:{
                id,
                userId,
            },
        });
        if(!isTheUser_Owner)return{error:"Not Authenticated"};
        await db.task.delete({
            where:{
                id,
                userId,
            },
        });

        return {success:"Task Deleted Successfully"};
    }catch(error){
        console.log("Error while deleting task:",error);
        return{error:"Something went wrong"};
    }
}