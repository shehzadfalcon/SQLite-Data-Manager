import { useState, useEffect } from "react";
import type { FC } from "react";
import { IAgent } from "src/types/Agent";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Reviews from "./components/Reviews";

async function fetchInitialData(id: string) {
  return await axios.get(`/agents/${id}`);
}

const AgentDetails: FC = () => {
  const [agent, setAgent] = useState<IAgent>();
  const { id } = useParams();

  const { data, isFetching, isSuccess, isLoading } = useQuery(
    ["AGENTS", id],
    () => fetchInitialData(id!),
    {
      refetchOnWindowFocus: false,
      retry: 2,
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      setAgent(data.data);
    }
  }, [isFetching, isSuccess, data]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  function _renderAboutMe(agent: IAgent) {
    return (
      <>
        <Typography variant="h6" color="GrayText" fontWeight={500} mt={2}>
          About Me:
        </Typography>
        <Typography variant="body2" color="GrayText" fontWeight={500}>
          {agent?.aboutMe}
        </Typography>
      </>
    );
  }

  function _renderPracticeArea(agent: IAgent) {
    return (
      <Stack direction="row" spacing={1}>
        {/* @ts-ignore */}
        {agent?.practiceAreas.split(",").map((area: string) => (
          <Chip
            key={area}
            label={area}
            variant="outlined"
            size="small"
            color="info"
          />
        ))}
      </Stack>
    );
  }

  return (
    <Box p={4}>
      {agent && (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3.5} md={2.5} lg={2}>
            <Avatar
              sx={{
                bgcolor: blue[600],
                width: "100%",
                height: "auto",
                aspectRatio: 1,
              }}
              alt={agent?.firstName}
              src={agent?.photoUrl}
              variant="rounded"
            >
              {agent?.firstName}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm={8.5} md={9.5} lg={10}>
            <Typography variant="h4" color="primary" fontWeight={600}>
              {agent?.firstName + " " + agent?.lastName}
            </Typography>

            <Typography variant="h6" color="secondary" fontWeight={500}>
              {agent?.address}
            </Typography>

            <Typography variant="h6" color="secondary" fontWeight={500}>
              Agent License: {agent?.agentLicence}
            </Typography>

            <Typography variant="h6" color="GrayText" fontWeight={500} mt={2}>
              Practice Areas:
            </Typography>
            {/* practice area */}
            {_renderPracticeArea(agent)}
            {/* about me */}
            {_renderAboutMe(agent)}

            <Divider sx={{ my: 2 }} />
            {/* reviews */}
            <Reviews agent={agent} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default AgentDetails;
