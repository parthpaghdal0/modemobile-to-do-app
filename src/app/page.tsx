"use client"

import { ToDoModal, DeleteModal } from "@/components/ToDoModal";
import { useToDoContext } from "@/contexts/ToDoContext";
import ToDoItem from "@/interfaces/ToDoItem";
import { Button, Stack, TableContainer, Typography, Paper, Table, TableHead, Pagination, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState<ToDoItem | undefined>();

  const { todos, refreshToDo, totalCount, page, setPage } = useToDoContext();

  const handleCreate = () => {
    setOpen(true);
    setUpdate(false);
    setItem(undefined);
  }

  const handleUpdate = (item: ToDoItem) => {
    setOpen(true);
    setUpdate(true);
    setItem(item);
  }

  const handleDelete = (item: ToDoItem) => {
    setOpenDelete(true);
    setItem(item);
  }

  useEffect(() => {
    if (todos === null)
      refreshToDo();
  }, [todos])

  const completed = todos?.reduce((cnt, item) => cnt + (item.completed ? 1 : 0), 0);

  return (
    <Stack padding={2} gap={2} marginBottom="auto">
      <Stack direction="row" gap={2}>
        <Typography variant="h5" className="mr-auto">
          Current Balance: {balance}
        </Typography>
        <Button color="secondary" disabled={completed === undefined || completed < 2} variant="outlined">Mint</Button>
        <Button color="secondary" disabled={balance <= 0} variant="outlined">Burn</Button>
      </Stack>
      <Stack direction="row">
        <Button color="primary" variant="outlined" onClick={handleCreate}>Create To Do</Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Completed</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(todos === null || totalCount === 0) &&
              <TableRow>
                <TableCell colSpan={7}>
                  <Stack paddingY={20} alignItems="center">
                    <Typography>
                      {todos === null ? "Loading ..." : "No items found"}
                    </Typography>
                  </Stack>
                </TableCell>
              </TableRow>}
            {todos?.map((row) => {
              return <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{new Date(row.dueDate).toDateString()}</TableCell>
                <TableCell>{row.priority}</TableCell>
                <TableCell>{row.completed ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Stack direction="row" gap={2} justifyContent="end">
                    <Button color="secondary" variant="outlined" onClick={() => handleUpdate(row)}>Update</Button>
                    <Button color="error" variant="outlined" onClick={() => handleDelete(row)}>Delete</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" gap={2} justifyContent="end" alignItems="center">
        <Typography>
          {(page - 1) * 10 + 1}-{(page - 1) * 10 + (todos?.length || 0)} of {totalCount}
        </Typography>
        <Pagination count={Math.ceil(totalCount / 10)} onChange={(e, page) => setPage(page)} />
      </Stack>
      {open && <ToDoModal open={open} onClose={() => setOpen(false)} update={update} item={item} />}
      {openDelete && <DeleteModal open={openDelete} onClose={() => setOpenDelete(false)} item={item} />}
    </Stack>
  );
}
