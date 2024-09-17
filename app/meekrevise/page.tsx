"use client";
import { FormControl, TextField, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function Home() {
  const [user, setUser] = useState("User");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleChangeUser = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
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
    setUser("User");
  };

  const handleSubmit = () => {
    console.log("Question:", question);
    console.log("Answer:", answer);
    console.log("User:", user);
    // Add your form submission logic here
  };

  return (
    <main className="flex h-screen w-screen bg-slate-100 justify-center items-center">
      <div className="space-y-4 w-full max-w-lg">
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
    </main>
  );
}
