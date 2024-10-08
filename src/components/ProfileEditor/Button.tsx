/**
 * This code was generated by Builder.io.
 */
import React from "react";

type ButtonProps = {
  label: string;
};

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <button className="self-end px-16 py-3.5 mt-8 max-w-full text-lg font-medium text-center text-white whitespace-nowrap bg-blue-700 rounded-2xl w-[190px] max-md:px-5">
      {label}
    </button>
  );
};

export default Button;
