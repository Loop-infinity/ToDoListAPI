import { Injectable } from '@angular/core';
import { Todo } from './Todo.model';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { TodoTask } from './TodoTask.model';
import { catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http:HttpClient, private datePipe: DatePipe) { }

  testTodo: Todo = new Todo();
  baseUrl: string = "http://localhost:36680/api/Todo";

  todoInService: Todo = new Todo();

  getTodoByDate(d: Date): Observable<Todo>{
    let transformedDate = this.datePipe.transform(d, 'yyyy-MM-dd');
    console.log("Date : "+transformedDate);

    let url = this.baseUrl + "/" + transformedDate +" 00:00:00.0000000";

    return this.http.get<Todo>(url);
  }


  postTask(todoTask: TodoTask, d: Date){
    let transformedDate = this.datePipe.transform(d, 'yyyy-MM-dd');
    let url = this.baseUrl + "?date=" + transformedDate +" 00:00:00.0000000";
    
    return this.http.post(url,todoTask);
  }

  putTask(todoTask: TodoTask){
    return this.http.put(this.baseUrl+"/"+todoTask.id, todoTask);
  }

  deleteTask(id: number){
    return this.http.delete(this.baseUrl+"/"+id);
  }

}


