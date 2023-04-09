import React from "react";
import { ArrowRight, ArrowLeft } from "./icons";

interface ButtonTabContentProps {
  side: string;
  name: string;
  handleClick: Function;
}

export const ButtonTabContent: React.FC<ButtonTabContentProps> = ({
  side,
  name,
  handleClick,
}) => {
  return (
    <>
      <button
        onClick={() => handleClick()}
        className={`text-sm h-10 w-28 absolute hover:bg-opacity-80 bottom-2 btn border bg-expresso-dark px-3 py-1 rounded flex justify-between items-center text-white shadow-lg ${
          side === "left" ? "right-2" : "left-2"
        }`}
      >
        {side === "left" ? (
          <>
            {name}
            <ArrowRight />
          </>
        ) : (
          <>
            <ArrowLeft />
            {name}
          </>
        )}
      </button>
    </>
  );
};
