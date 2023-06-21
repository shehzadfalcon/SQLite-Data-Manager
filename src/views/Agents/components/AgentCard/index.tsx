import type { FC } from "react";
import { IAgent } from "src/types/Agent";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";

const AgentCard: FC<{ agent: IAgent }> = ({ agent }) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/agent/${agent.id}`)} sx={{cursor: "pointer"}}>
      <CardMedia
        component="img"
        alt={agent.firstName}
        height="140"
        image={agent.photoUrl}
        sx={{bgcolor: blue[500]}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {agent.firstName + " " + agent.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '5',
            WebkitBoxOrient: 'vertical',
            minHeight: "86px"
          }}>
          {agent.aboutMe}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
