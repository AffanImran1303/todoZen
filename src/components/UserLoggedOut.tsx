"use client";
import React from "react";

const UserLoggedOutMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f54747"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-user-x"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="18" x2="23" y1="6" y2="11" />
        <line x1="23" x2="18" y1="6" y2="11" />
      </svg>
      <p className="mt-4 text-lg text-gray-600">
        Please sign in to view your tasks.
      </p>
    </div>
  );
};

export default UserLoggedOutMessage;