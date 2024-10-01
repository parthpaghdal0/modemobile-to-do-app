
export default interface ToDoItem {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
}