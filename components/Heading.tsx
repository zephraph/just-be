import React from "react";

export const H1 = ({ children, className = "", ...props }) => (
  <h1
    className={`transition-0_5 sm:text-4xl text-3xl font-bold ${className}`}
    {...props}
  >
    {children}
  </h1>
);
