"use client";
import React from "react";

const UserLoggedOutMessage: React.FC = () => {
  return (
    <div className="flex space-x-2 items-center place-content-center">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
      <p className="text-lg text-gray-600">
        Please sign in to view your tasks.
      </p>
    </div>
  );
};

export default UserLoggedOutMessage;