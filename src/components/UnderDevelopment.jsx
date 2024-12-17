import React from "react";

export default function UnderDevelopment() {
  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-xl z-50">
      <div className="bg-gray-900 border border-gray-600 rounded-lg shadow-lg p-8 m-4">
        <p className="text-white text-center text-xl">
          Site is under development !
        </p>
        <div className="flex justify-end w-full mt-1">
          <p>- Sabeshragav</p>
        </div>
      </div>
    </div>
  );
}
