import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  ngOnInit() {}

  onEditTask(id: number): void {
    this.router.navigate(['/edit-task', id]);
  }

  onUpdateTask(): void {
    this.updateTask.emit(this.task);
  }

  onDeleteTask(): void {
    this.deleteTask.emit(this.task.id);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Open':
        return 'open';
      case 'Pending':
        return 'pending';
      case 'In Progress':
        return 'in-progress';
      case 'Completed':
        return 'completed';
      default:
        return '';
    }
  }
}
