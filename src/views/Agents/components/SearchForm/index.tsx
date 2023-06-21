import { Button, Stack, TextField } from "@mui/material";
import { IAgent } from "src/types/Agent";
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";

type IData = {
  data: IAgent[];
};

interface ISearch {
  data: IData;
  setAgents: React.Dispatch<React.SetStateAction<IAgent[]>>;
}

const SearchForm = (props: ISearch) => {
  const { data, setAgents }: ISearch = props;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const value = event.target.value.toLocaleLowerCase();
    if (data) {
      const filteredData = data.data.filter((agent: IAgent) => {
        //@ts-ignore
        return agent.practiceAreas.toLowerCase().includes(value);
      });
      setAgents(filteredData);
    }
  };
  return (
    <Stack mb={3} direction="row" justifyContent="space-between">
      <TextField
        size="small"
        label="Search By Practice Area"
        value={searchQuery}
        onChange={handleSearch}
      />
      <Button
        variant="contained"
        disableElevation
        onClick={() => navigate("/create")}
      >
        Join the team!
      </Button>
    </Stack>
  );
};

export default SearchForm;
