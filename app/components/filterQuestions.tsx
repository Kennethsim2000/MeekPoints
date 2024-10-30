import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { Question } from "../meekrevise/questions/page";

type PropType = {
  setQuestions: (questions: Question[]) => void;
};
export default function FilterQuestionsComponent(props: PropType) {
  const [user, setUser] = useState("");
  const [topic, setTopic] = useState("");
  const [sortCriteria, setSortCritera] = useState("");

  const handleButtonClick = async () => {
    const res = await fetch(
      `/api/questions?filterUser=${user}&filterTopic=${topic}&sortCriteria=${sortCriteria}`
    );
    const questions = await res.json();
  };

  const filterByUser = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
  };
  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };
  return (
    <div className="flex-col bg-slate-100 flex-grow hidden md:block gap-2">
      <div className="mt-4">
        <Typography gutterBottom variant="h4" component="div" className="mb-3">
          Filter
        </Typography>
        <FormControl fullWidth className="mb-3">
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="User"
            onChange={filterByUser}
          >
            <MenuItem value={"Jamie"}>Jamie</MenuItem>
            <MenuItem value={"Kenneth"}>Kenneth</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className="mb-3">
          <TextField
            label="Topic"
            multiline
            maxRows={1}
            fullWidth
            value={topic}
            onChange={handleTopicChange}
          />
        </FormControl>
      </div>
      <div className="mb-3">
        <Typography gutterBottom variant="h4" component="div" className="mb-3">
          Sort
        </Typography>
        <FormControl fullWidth className="mb-3">
          <InputLabel id="demo-simple-select-label">Sort criteria</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="User"
            onChange={filterByUser}
          >
            <MenuItem value={"Jamie"}>Jamie</MenuItem>
            <MenuItem value={"Kenneth"}>Kenneth</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleButtonClick}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
