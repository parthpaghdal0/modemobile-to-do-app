"use client"

import React, { useState } from "react";
import ToDoModalProps from "@/interfaces/ToDoModalProps";
import { Modal, Typography, Stack, TextField, Select, MenuItem, FormControl, InputLabel, Button, Switch } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import dayjs from "dayjs";
import axios from "axios";
import { useToDoContext } from "@/contexts/ToDoContext";
import { useToastContext } from "@/contexts/ToastContext";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '90vw',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

export const ToDoModal = ({ open, onClose, update, item }: ToDoModalProps) => {
    const [title, setTitle] = useState(item?.title || "");
    const [description, setDescription] = useState(item?.description || "");
    const [dueDate, setDueDate] = useState(item?.dueDate ? dayjs(item.dueDate) : null);
    const [priority, setPriority] = useState(item?.priority || "");
    const [completed, setCompleted] = useState(item?.completed || false);

    const { refreshToDo } = useToDoContext();
    const { showToast } = useToastContext();

    const handleSubmit = async () => {
        if (update) {
            try {
                const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${item?.id}`, {
                    title,
                    description,
                    dueDate,
                    priority,
                    completed
                })
                refreshToDo();
            } catch (e: any) {
                showToast(e.response.data.error);
            }
        }
        else {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos`, {
                    title,
                    description,
                    dueDate,
                    priority,
                    completed
                })
                refreshToDo();
            } catch (e: any) {
                showToast(e.response.data.error);
            }
        }
        onClose();
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Stack sx={style} gap={2}>
                <Typography variant="h6">
                    {update ? "Update to do item" : "Create to do item"}
                </Typography>
                {update && <>
                    <TextField disabled variant="outlined" value={item?.id} label="ID" />
                </>}
                <TextField variant="outlined" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField variant="outlined" label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <DatePicker label="Due Date" value={dueDate} onChange={(e) => setDueDate(e)} />
                <FormControl>
                    <InputLabel>Priority</InputLabel>
                    <Select label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <MenuItem value="low">Low</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="high">High</MenuItem>
                    </Select>
                </FormControl>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography>Completed</Typography>
                    <Switch defaultChecked={completed} value={completed} onChange={(e) => setCompleted(e.target.checked)} />
                </Stack>
                <Stack direction="row" gap={2} justifyContent="end">
                    <Button variant="outlined" onClick={handleSubmit}>{update ? "Update" : "Create"}</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </Stack>
            </Stack>
        </Modal>
    );
}

export const DeleteModal = ({ open, onClose, item }: ToDoModalProps) => {
    const { refreshToDo } = useToDoContext();
    const { showToast } = useToastContext();

    const handleSubmit = async () => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos/${item?.id}`)
            refreshToDo();
        } catch (e: any) {
            showToast(e.response.data.error);
        }
        onClose();
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Stack sx={style} gap={2}>
                <Typography variant="h6">
                    Do you want to delete this item?
                </Typography>
                <Stack direction="row" gap={2} justifyContent="end">
                    <Button color="error" variant="outlined" onClick={handleSubmit}>Delete</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </Stack>
            </Stack>
        </Modal>
    );
}