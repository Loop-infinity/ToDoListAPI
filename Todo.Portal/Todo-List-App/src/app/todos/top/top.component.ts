import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { TodoTask } from 'src/app/shared/TodoTask.model';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  //@Input() todoTasks!: TodoTask[];

  @Input() count!: number;

  constructor() { }

  ngOnInit() {
    //this.count = this.todoTasks!.length;
  }

}
