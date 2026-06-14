import React from "react";
import clsx from "clsx";

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <div className={clsx("glass rounded-xl p-6", className)}>
      {children}
    </div>
  );
}
