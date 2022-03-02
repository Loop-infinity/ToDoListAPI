import { TodoTask } from "./TodoTask.model";

export class Todo {
    id: number = 0;
    date: Date = new Date();
    todoTasks : TodoTask[]=[];
    
}
