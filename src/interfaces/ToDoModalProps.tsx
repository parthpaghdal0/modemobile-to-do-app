import ToDoItem from "./ToDoItem";

export default interface ToDoModalProps {
    open: boolean,
    onClose: () => void,
    update?: boolean,
    item?: ToDoItem,
}