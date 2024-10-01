"use client"

import { ToDoModal, DeleteModal } from "@/components/ToDoModal";
import ToDoItem from "@/interfaces/ToDoItem";
import { Button, Stack, TableContainer, Typography, Paper, Table, TableHead, Pagination, TableRow, TableCell, TableBody } from "@mui/material";
import { useState } from "react";

const rows: Array<ToDoItem> = [
  { id: "1", title: "demo_title", description: "demo_description", dueDate: new Date(), priority: "low", completed: false },
  { id: "2", title: "demo_title", description: "demo_description", dueDate: new Date(), priority: "low", completed: false },
  { id: "3", title: "demo_title", description: "demo_description", dueDate: new Date(), priority: "low", completed: false },
  { id: "4", title: "demo_title", description: "demo_description", dueDate: new Date(), priority: "low", completed: false },
  { id: "5", title: "demo_title", description: "demo_description", dueDate: new Date(), priority: "low", completed: false },
  { id: "6", title: "demo_title", description: "demo_description", dueDate: new Date(), priority: "low", completed: false },
  { id: "7", title: "demo_title", description: "demo_description", dueDate: new Date(), priority: "low", completed: false },
]

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState<ToDoItem | undefined>();

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

  return (
    <Stack padding={2} gap={2}>
      <Stack direction="row" gap={2}>
        <Typography variant="h5" className="mr-auto">
          Current Balance: {balance}
        </Typography>
        <Button color="secondary" disabled variant="outlined">Mint</Button>
        <Button color="secondary" variant="outlined">Burn</Button>
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
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.dueDate.toDateString()}</TableCell>
                <TableCell>{row.priority}</TableCell>
                <TableCell>{row.completed ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Stack direction="row" gap={2} justifyContent="end">
                    <Button color="secondary" variant="outlined" onClick={() => handleUpdate(row)}>Update</Button>
                    <Button color="error" variant="outlined" onClick={() => handleDelete(row)}>Delete</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" gap={2} justifyContent="end" alignItems="center">
        <Typography>
          1-5 of 9
        </Typography>
        <Pagination count={2} />
      </Stack>
      {open && <ToDoModal open={open} onClose={() => setOpen(false)} update={update} item={item} />}
      {openDelete && <DeleteModal open={openDelete} onClose={() => setOpenDelete(false)} item={item} />}
    </Stack>
  );
}
