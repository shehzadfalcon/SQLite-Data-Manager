import { useState } from "react";
import { IAgent } from "src/types/Agent";
import { Box, Typography, Paper, TextField, Grid, Rating, Button, Stack, Divider } from "@mui/material";
import { useMutation, useQueryClient } from 'react-query';
import axios from "axios";

interface IProps {
  agent: IAgent
}

const Reviews = ({ agent }: IProps) => {
  const [rating, setRating] = useState<number | null>(0);
  const [desc, setDesc] = useState<string | null>("");

  const queryClient = useQueryClient();
  const addReviewMutation = useMutation((data: any) => {
    return axios.post(`/agent/${agent.id}`, data);
  });

  const submitHandler = () => {
    const payload = {
      desc: desc,
      rating: rating
    };

    addReviewMutation.mutate(payload, {
      onSuccess: (res) => {
        queryClient.invalidateQueries(agent.id);
        console.log("[RESPONSE]", res);
        setRating(0);
        setDesc("");
      }
    })
  }

  return (
    <Box>
      <Typography variant="h6" color="GrayText" fontWeight={500} mt={2} mb={1}>
        Agent Reviews:
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h6" color="primary" fontWeight={500} mb={1}>
                Select Rating:
              </Typography>
              <Rating
                value={rating}
                size="large"
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              label="Description" size="small"
              value={desc}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDesc(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              disableElevation
              disabled={!(!!rating && !!desc)}
              onClick={submitHandler}
            >
              Add Review
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {agent.Reviews.length ? (
        agent.Reviews.map((review) => (
          <Stack mt={1}>
            <Rating value={review.rating} readOnly size="large" />
            <Typography variant="h6" color="GrayText" fontWeight={500} mb={1}>
              {review.desc}
            </Typography>
            <Divider />
          </Stack>
        ))
      ) : (
        <Typography variant="h6" color="GrayText" fontWeight={500} mt={2} mb={1}>
          This agent has no reviews.
        </Typography>
      )}

    </Box>
  );
};

export default Reviews;
