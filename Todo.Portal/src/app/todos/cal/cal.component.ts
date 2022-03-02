import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

//services
import { TodosService } from 'src/app/shared/todos.service';
import { Todo } from 'src/app/shared/Todo.model';
import { TodoTask } from 'src/app/shared/TodoTask.model';


@Component({
  selector: 'app-cal',
  templateUrl: './cal.component.html',
  styleUrls: ['./cal.component.css'],
  providers: [DatePipe]
})
export class CalComponent implements OnInit {

  constructor(private todosService: TodosService, private datePipe: DatePipe) { 
    
  }

  date : Date = new Date();

  //passing data to parent
  @Input() todoFromDb: Todo = new Todo();
  @Output() notify = new EventEmitter();

  ngOnInit() {
  }

  OnCalenderClick(){
    console.log("onclickdate"+this.datePipe.transform(this.date, 'yyyy-MM-dd'));
   
    this.todosService.getTodoByDate(this.date)
        .subscribe(
          result=> {
            //console.log(result);
            this.todoFromDb = result;
            this.notify.emit(this.todoFromDb);
          },
          error => {
            this.todoFromDb = new Todo();
            this.todoFromDb.date = this.date;
            this.notify.emit(this.todoFromDb);
            console.log("error bro");
          }
        );

    
    
  }


}
