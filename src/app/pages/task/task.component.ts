import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task!: Task;
  @Output() updateTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() deleteTask: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  onUpdateTask(): void {
    this.updateTask.emit(this.task);
  }

  onDeleteTask(): void {
    this.deleteTask.emit(this.task.id);
  }
}
