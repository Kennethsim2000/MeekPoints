"use client";
import { FormControl, TextField, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Confetti from "react-confetti";
import DrawerComponent from "../components/drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const dynamic = "force-dynamic";

export default function Home() {
  const [user, setUser] = useState("");
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState("");
  const [answer, setAnswer] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const theme = useTheme();

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const handleChangeUser = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };
  const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleClear = () => {
    setQuestion("");
    setAnswer("");
    setTopic("");
    setUser("");
  };

  const handleSubmit = async () => {
    const questionObj = {
      topic: topic,
      question: question,
      answer: answer,
      username: user,
      date_shown: new Date(),
    };
    fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(questionObj),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowAdd(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="flex h-screen w-screen bg-slate-100 justify-center items-center">
      <div className="space-y-4 w-full max-w-lg">
        <TextField
          label="Topic"
          multiline
          maxRows={1}
          fullWidth
          value={topic}
          onChange={handleTopicChange}
        />
        <TextField
          label="Question"
          multiline
          maxRows={4}
          fullWidth
          value={question}
          onChange={handleQuestionChange}
        />
        <TextField
          label="Answer"
          multiline
          rows={6}
          fullWidth
          value={answer}
          onChange={handleAnswerChange}
        />
        <FormControl fullWidth>
          <InputLabel>User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="User"
            fullWidth
            onChange={handleChangeUser}
          >
            <MenuItem value="Kenneth">Kenneth</MenuItem>
            <MenuItem value="Jamie">Jamie</MenuItem>
          </Select>
        </FormControl>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outlined" onClick={handleClear}>
            Clear all
          </Button>
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showAdd}
        onHide={() => setShowAdd(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Congratulations for adding a question!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Keep up the good work! MeekRevise is proud of you!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowAdd(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      {showAdd && <Confetti />}
      {isMdUp && <DrawerComponent />}
    </main>
  );
}
