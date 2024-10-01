"use client"

import React, { useState } from "react";
import ToDoModalProps from "@/interfaces/ToDoModalProps";
import { Modal, Typography, Stack, TextField, Select, MenuItem, FormControl, InputLabel, Button, Switch } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import dayjs from "dayjs";

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
    const [descripition, setDescription] = useState(item?.description || "");
    const [dueDate, setDueDate] = useState(dayjs(item?.dueDate));
    const [priority, setPriority] = useState(item?.priority || "");
    const [completed, setCompleted] = useState(item?.completed || false);

    const handleSubmit = () => {
        if (update) {
            console.log(`Updating ${item?.id} ${title} ${descripition} ${dueDate} ${priority} ${completed}`);
        }
        else {
            console.log(`Creating ${title} ${descripition} ${dueDate} ${priority} ${completed}`);
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
                <TextField variant="outlined" label="Description" value={descripition} onChange={(e) => setDescription(e.target.value)} />
                <DatePicker label="Due Date" value={dueDate} onChange={(e) => setDueDate(dueDate)} />
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
                    <Switch value={completed} onChange={(e) => setCompleted(e.target.checked)} />
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
    const handleSubmit = () => {
        console.log(`Removing ${item?.id}`);
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