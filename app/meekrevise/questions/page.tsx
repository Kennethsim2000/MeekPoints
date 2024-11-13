"use client";

import DrawerComponent from "../../components/drawer";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FilterQuestionsComponent from "../../components/filterQuestions";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

export type Question = {
  id: number;
  created_at: Date;
  topic: string;
  question: string;
  answer: string;
  username: string;
  date_shown: Date;
};

export default function Home() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [isLoaded, setIsLoaded] = useState<Boolean>();

  const widthOfCard = isMdUp ? "650px" : "400px";

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch("/api/questions");
      const res2 = await res.json();
      const questions = res2.tables;
      setQuestions(questions);
      setIsLoaded(true);
    }
    fetchQuestions();
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  const renderCard = (question: Question) => (
    <div>
      <Card sx={{ width: widthOfCard, margin: 0 }} key={question.topic}>
        <CardContent>
          <div className="flex justify-between">
            <Typography gutterBottom variant="h5" component="div">
              {question.question}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              {question.username}
            </Typography>
          </div>

          <Typography variant="body2" color="text.secondary">
            {question.topic}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              setShowQuestion(true);
              setCurrentQuestion(question);
            }}
          >
            View Question
          </Button>
        </CardActions>
      </Card>
      <Divider sx={{ borderBottomWidth: 2, backgroundColor: "#000" }} />
    </div>
  );

  return (
    <div className="h-screen flex  bg-slate-100 w-screen">
      {isMdUp && <DrawerComponent />}
      <div className="flex-col h-full overflow-y-auto bg-slate-100 md:w-3/5 md:ml-56">
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          overflow="auto"
          p={3}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            maxWidth="600px"
            width="600px"
          >
            {questions.map((question) => renderCard(question))}
          </Box>
        </Box>
      </div>
      <FilterQuestionsComponent setQuestions={setQuestions} />
      <Modal
        show={showQuestion}
        onHide={() => setShowQuestion(false)}
        aria-labelledby="example-custom-modal-styling-title"
        centered
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="bg-white w-full max-w-screen-sm rounded-lg shadow-lg overflow-hidden">
          <Modal.Header className="p-4 border-b">
            <h5 className="text-xl font-bold">{`Question by ${currentQuestion?.username}`}</h5>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowQuestion(false)}
            >
              &times;
            </button>
          </Modal.Header>
          <Modal.Body className="p-4 max-h-[70vh] overflow-y-auto">
            <h5 className="font-semibold">Topic: {currentQuestion?.topic}</h5>
            <p className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
              <strong>Question:</strong> {currentQuestion?.question}
            </p>
            <p className="mt-2" style={{ whiteSpace: "pre-wrap" }}>
              <strong>Answer:</strong> {currentQuestion?.answer}
            </p>
          </Modal.Body>
          <Modal.Footer className="p-4 border-t">
            <div className="flex flex-wrap justify-between gap-2 w-full">
              <Button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex-grow sm:flex-grow-0"
                onClick={() => setShowQuestion(false)}
              >
                Close
              </Button>
              <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex-grow sm:flex-grow-0">
                Delete Question
              </Button>
              <Button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex-grow sm:flex-grow-0">
                Complete Task
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}
