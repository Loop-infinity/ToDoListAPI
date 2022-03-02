import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from '../shared/Todo.model';
import { TodosService } from '../shared/todos.service';
import { TodoTask } from '../shared/TodoTask.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todo: Todo = new Todo();
  //todoCopy: Todo = new Todo();
  formData: TodoTask = new TodoTask();
  iC: boolean = false;
  pendingTasksCount: number = 0;

  todoItem: string="";

  itemViews = [
    {name: 'All', value: 1},
    {name: 'Completed', value: 2},
    {name: 'Pending', value: 3}
  ];

  selectedView: number=1;

  value2: number=0;

  constructor(public todosService: TodosService,private router: Router) { }

  ngOnInit() {
    this.todosService.getTodoByDate(new Date())
        .subscribe(
          result=> {      
            this.todo = result;
            console.log(this.todo);
            this.updatePendingTasksCount();
            //console.log(result);
            //this.todoCopy = Object.assign({},result);
          },
          error => {
            console.log(error);
          }
        );
  } 

  //Calender Component - Passing data from child to parent
  onNotify(t: Todo) {
   this.todo = t;
   this.updatePendingTasksCount();
   console.log(this.todo);
  }

  toggleTaskInDb(e: Event,todoTask: TodoTask){
    console.log("Onchange");
    this.todosService.putTask(todoTask).subscribe();
    this.updatePendingTasksCount();
    
  }

  onSubmit(form: NgForm){
    this.formData.todoId = this.todo.id;

    if(this.formData.id === 0 )
    {
      this.insertData(form);
    }
    else
    {
      this.updateData(form);
    }
  }

  //Edit Task
  onEdit(todoTask: TodoTask){
    this.showDialog();
    this.formData = todoTask;
  }   

  //Delete Task
  onDelete(id: number){
    this.todosService.deleteTask(id)
    .subscribe(
      result => {
        this.refreshList(this.todo.date);
        //this.updatePendingTasksCount();
        console.log(result);
      },
      error => {
        console.log("yellow");
      });             
  }

  insertData(form: NgForm){
    
    this.todosService.postTask(this.formData, this.todo.date)
    .subscribe(
      result => {
        console.log(result);
        this.refreshList(this.todo.date);
        form.form.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateData(form: NgForm){
    this.todosService.putTask(this.formData)
    .subscribe(
      result => {
        console.log(result);
        this.refreshList(this.todo.date);
        form.form.reset();
      },
      err => {
        console.log(err);
      }
    );
  }

  refreshList(d: Date){
    this.todosService.getTodoByDate(d)
        .subscribe(
          result=> { 
            this.todo = result;
            //this.todoCopy = Object.assign({},result);
            this.updatePendingTasksCount();
          },
          error => {
            this.todo.todoTasks = [];
            console.log(error);
            this.updatePendingTasksCount();
          }
        );
  }  

  display: boolean = false;

  // Add / Update Dialog
  showDialog() 
  {
    this.formData = new TodoTask();
    this.display = true;
  }

  // All | Completed | Pending
  changeView(){
    switch(this.selectedView){
      
      case 1:
        
        this.todosService.getTodoByDate(this.todo.date)
        .subscribe(
          result=> { 
            this.todo = result;
            console.log(this.todo);   
          },
          error => {
            console.log(error);
          }
        );

        break;

      case 2:

        this.todosService.getTodoByDate(this.todo.date)
        .subscribe(
          result=> {   
            this.todo.todoTasks = result.todoTasks.filter(task => task.isCompleted === true);
            console.log(this.todo); 
          },
          error => {
            console.log(error);
          }
        );
        break;
        
      case 3:

        this.todosService.getTodoByDate(this.todo.date)
        .subscribe(
          result=> {    
            this.todo.todoTasks = result.todoTasks.filter(task => task.isCompleted === false);
            console.log(this.todo);
          },
          error => {
            console.log(error);
          }
        );
     
        break;
    }
    
  }

  updatePendingTasksCount(){
    this.pendingTasksCount = this.todo.todoTasks.filter(task => task.isCompleted === false).length;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  // addTodoItem(){
  //   if(this.formData.title !== "")
  //   {
  //     this.todo.todoTasks.push(this.formData);
  //   }
  // }
  
}
