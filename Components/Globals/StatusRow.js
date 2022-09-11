import React from "react";

export default function StatusRow({ active, color, textColor, text }) {
  return (
    <div>
      {active ? (
        <div className="w-24 text-center bg-green-400 text-green-800 py-1 px-1  rounded-xl">
          <span>active</span>
        </div>
      ) : color ? (
        <div
          className={` w-24 text-center ${color} ${textColor} py-1 px-1  rounded-xl`}
        >
          <span>{text}</span>
        </div>
      ) : (
        <div className=" w-24 text-center bg-red-400 text-red-800 py-1 px-1  rounded-xl">
          <span>disabled</span>
        </div>
      )}
    </div>
  );
}
