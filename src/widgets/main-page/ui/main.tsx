import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getQuery } from "@shared/api";
import { IItem } from "../model";
import { MainTable } from "./table";
import { useState } from "react";
import { CreatePostModal } from "./create";

export const Main = () => {
  const { data, isError, isLoading } = useQuery('posts', getQuery<IItem[]>('posts'));
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (!data) return <div>No data...</div>;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography variant="h1" mb={5} mt={5}>Main</Typography>
        <Button variant="contained" color="success" onClick={handleOpen}>
          Создать
        </Button>
      </Box>
      <MainTable data={data} />
      <CreatePostModal open={open} handleClose={handleClose} />
    </>
  );
};
