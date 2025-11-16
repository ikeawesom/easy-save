import React from "react";
import { twMerge } from "tailwind-merge";

export default function Container({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "max-w-[800px] w-full p-4 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
