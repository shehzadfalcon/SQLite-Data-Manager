import type { FC } from "react";
import { useState, useEffect } from "react";
import AgentCard from "./components/AgentCard";
import { IAgent } from "src/types/Agent";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import { useQuery } from "react-query";
import SearchForm from "./components/SearchForm";
async function fetchInitialData() {
  return await axios.get("/agents");
}

const Agents: FC = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);

  const { data, isFetching, isSuccess } = useQuery(
    ["AGENTS"],
    fetchInitialData,
    {
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      setAgents(data.data);
    }
  }, [isFetching, isSuccess, data]);

  //render agent card
  function _renderAgent() {
    return (
      <Grid container spacing={3}>
        {agents?.map((agent) => (
          <Grid item xs={12} sm={4} md={3} lg={2} key={agent?.id}>
            <AgentCard agent={agent} />
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <Box p={2}>
      {/* search form */}
      {data && <SearchForm setAgents={setAgents} data={data} />}
      {/* agents list */}
      {_renderAgent()}
    </Box>
  );
};

export default Agents;
