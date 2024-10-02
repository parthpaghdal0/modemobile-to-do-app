
import ToDoContextProps from "@/interfaces/ToDoContextProps";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useToastContext } from "./ToastContext";

const ToDoContext = createContext<ToDoContextProps>({
    todos: null,
    refreshToDo: () => { },
    totalCount: 0,
    page: 0,
    setPage: (page: number) => { },
});

export function ToDoProvider({ children }: { children: React.ReactNode }) {
    const [todos, setTodos] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [page, _setPage] = useState(1);

    const {showToast} = useToastContext();

    useEffect(() => {
        refreshToDo();
    }, [page])

    const refreshToDo = async () => {
        try {
            setTodos(null);
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todos?page=${page}`);
            setTodos(res.data.data);
            setTotalCount(res.data.total);
        } catch (e) {
            showToast("Something went wrong, please try again.");
        }
    }

    const setPage = (page: number) => {
        _setPage(page)
    }

    return (
        <ToDoContext.Provider value={{ todos, refreshToDo, totalCount, page, setPage }}>
            {children}
        </ToDoContext.Provider>
    )
}

export function useToDoContext() {
    return useContext(ToDoContext);
}