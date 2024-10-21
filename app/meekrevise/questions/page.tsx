"use client";

import DrawerComponent from "../../components/drawer";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import FilterQuestionsComponent from "../../components/filterQuestions";
import { useState, useEffect } from "react";

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

  const widthOfCard = isMdUp ? "650px" : "400px";

  useEffect(() => {
    async function fetchQuestions() {
      const res = await fetch("/api/questions");
      const res2 = await res.json();
      const questions = res2.tables;
      console.log(questions);
      setQuestions(questions);
    }
    fetchQuestions();
  }, []);

  const renderCard = (topic: string, question: string, username: string) => (
    <div>
      <Card sx={{ width: widthOfCard, margin: 0 }} key={topic}>
        <CardContent>
          <div className="flex justify-between">
            <Typography gutterBottom variant="h5" component="div">
              {topic}
            </Typography>
            <Typography gutterBottom variant="subtitle2" component="div">
              {username}
            </Typography>
          </div>

          <Typography variant="body2" color="text.secondary">
            {question}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Question</Button>
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
            {questions.map((question) =>
              renderCard(question.topic, question.question, question.username)
            )}
          </Box>
        </Box>
      </div>
      <FilterQuestionsComponent />
    </div>
  );
}
