"use client";

import { useState } from "react";
import Flashcard from "../../components/Flashcard";
import { Question } from "../../types/question";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DrawerComponent from "../../components/drawer";
import FilterQuestionsComponent from "@/app/components/filterQuestions";

export default function Home() {
  const theme = useTheme();

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const flashcards = [
    {
      question: "What is React?",
      answer: "A JavaScript library for building user interfaces.",
    },
    {
      question: "What is a component?",
      answer: "A reusable piece of UI that can be used multiple times.",
    },
    {
      question: "What is state in React?",
      answer: "An object that determines how a component renders and behaves.",
    },
    {
      question: "What is JSX?",
      answer: "A syntax extension for JavaScript that looks like HTML.",
    },
    {
      question: "What is a hook in React?",
      answer:
        "A special function that lets you use state and other features in functional components.",
    },
  ];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) =>
      Math.min(prevIndex + 1, flashcards.length - 1)
    );
  };

  const handlePrevious = () => {
    setCurrentCardIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <main className="flex h-screen w-screen bg-slate-100 ">
      <Flashcard
        card={flashcards[currentCardIndex]}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      {isMdUp && <DrawerComponent />}
      <FilterQuestionsComponent setQuestions={setQuestions} />
    </main>
  );
}
