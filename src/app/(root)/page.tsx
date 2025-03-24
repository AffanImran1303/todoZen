import AddNewTaskComponent from '@/components/AddTask'
import TaskList from '@/components/TaskList'
import React from 'react'

const page = () => {
  return (
    <section className="wrapper w-full lg:grid lg:grid-cols-2">
        <div className="md:p-12 grid grid-rows-3">
          <div className="place-content-center">
            <p className="font-semibold text-5xl">Find Your Center<span className="text-[#574ef0]">,</span><br></br>Complete Your<span className="text-[#574ef0]"> Tasks</span></p>
          </div>
          <div className="place-content-center">
            <p>Connect with your tasks, mindfully. TodoZen brings a sense of calm to your daily goals.</p>
          </div>
          <div>
            <AddNewTaskComponent/>
          </div>
        </div>
        <div className="border-2 shadow-2xl rounded-xl">
          <p className="text-2xl mt-4 place-self-center text-[#574ef0] font-semibold">My Tasks</p>
          <TaskList/>
        </div>
    </section>
  )
}

export default page