import type { FC } from "react";
import { IAgent } from "../../types/Agent";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";

const Header: FC<{ agent: IAgent }> = ({ agent }) => {
  return (
    <Grid item xs={12} sm={4} md={3} lg={2}>
      <Card>
        <CardMedia
          component="img"
          alt={agent.firstName}
          height="140"
          image={agent.photoUrl}
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
    </Grid>
  );
};

export default Header;
