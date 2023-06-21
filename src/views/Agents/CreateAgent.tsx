import type { FC } from "react";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Paper,
  Typography,
  Grid,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

const CreateAgent: FC = () => {
  const [areas, setAreas] = useState<any[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();
  const createAgentMutation = useMutation((data: any) => {
    return axios.post("/agents", data);
  });

  const navigate = useNavigate();

  //on submit
  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      ...(data.practiceAreas &&
        data.practiceAreas.length && {
          practiceAreas: data?.practiceAreas?.join(","),
        }),
    };

    createAgentMutation.mutate(payload, {
      onSuccess: (res) => {
        queryClient.invalidateQueries("AGENTS");
        console.log("[RESPONSE]", res);
        navigate("/");
      },
    });
  };

  return (
    <Box p={3}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h4" color="primary" fontWeight={600} mb={3}>
          Create New Agent
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={!!errors?.firstName}
                    fullWidth
                    label="First Name"
                    size="small"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={!!errors?.lastName}
                    fullWidth
                    label="Last Name"
                    size="small"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Controller
                name="agentLicence"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={!!errors?.agentLicence}
                    fullWidth
                    label="Agent License"
                    size="small"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={!!errors?.address}
                    fullWidth
                    label="Address"
                    size="small"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel
                  sx={{ top: "-7px", "&.MuiInputLabel-shrink": { top: 0 } }}
                  id="select-input-label"
                >
                  Practice Areas
                </InputLabel>
                <Controller
                  name="practiceAreas"
                  control={control}
                  render={({ field: { onChange, ...restField } }) => (
                    <Select
                      labelId="select-input-label"
                      id="select-input"
                      {...restField}
                      multiple
                      fullWidth
                      value={areas}
                      size="small"
                      input={<OutlinedInput label="Practice Areas" />}
                      onChange={(event: any) => {
                        setAreas(event.target.value as string[]);
                        setValue("practiceAreas", event.target.value);
                      }}
                    >
                      {placesOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="photoUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Photo Url"
                    size="small"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="aboutMe"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    rows={4}
                    label="About Me"
                    size="small"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                disableElevation
                type="submit"
                disabled={createAgentMutation.isLoading}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};
// validation schema
const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    agentLicence: yup.string().required(),
    address: yup.string().required(),
    practiceAreas: yup.array().optional(),
    aboutMe: yup.string().optional(),
    photoUrl: yup.string().optional(),
  })
  .required();

//form data
type FormData = yup.InferType<typeof schema>;

// place options
const placesOptions = [
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "San Francisco", label: "San Francisco" },
  { value: "Miami", label: "Miami" },
];

export default CreateAgent;
