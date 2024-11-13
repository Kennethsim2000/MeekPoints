import { useState } from "react";
import { Card } from "../types/question";
import { motion } from "framer-motion";

type PropType = {
  card: Card;
  onNext: () => void;
  onPrevious: () => void;
};

export default function FlashCardComponent(props: PropType) {
  const [flip, setFlip] = useState(true);

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-[30rem] h-[20rem]">
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute w-full h-full bg-white-200 rounded-lg shadow-lg p-4"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center justify-center w-full h-full text-2xl font-semibold">
              Test Question
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute w-full h-full bg-white-200 rounded-lg shadow-lg p-4"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex items-center justify-center w-full h-full text-2xl font-semibold">
              Test aswer
            </div>
          </div>
        </div>

        <button
          className=" transform -translate-x-1/2 px-2 py-2 bg-teal-500 text-white rounded"
          onClick={() => setFlip(!flip)}
        >
          {flip ? "Show Question" : "Show Answer"}
        </button>

        <button className="  px-2 py-2 bg-teal-500 text-white rounded">
          Next Question
        </button>
      </div>
    </div>
  );
}
