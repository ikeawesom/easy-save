import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-4 bg-white rounded-xl border border-gray-100 shadow-lg">
      {children}
    </div>
  );
}
