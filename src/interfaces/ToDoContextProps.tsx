import ToDoItem from "./ToDoItem";

export default interface ToDoContextProps {
    todos: Array<ToDoItem> | null,
    refreshToDo: () => void,
    totalCount: number,
    page: number,
    setPage: (page: number) => void,
}