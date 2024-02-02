import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }
  ngOnInit(): void {
    
  }
  tasks: Task[];

  

  updateTask(updatedTask: any): void {
    this.taskService.updateTask(updatedTask);
  }

  deleteTask(taskId: any): void {
    this.taskService.deleteTask(taskId);
  }

  onDrop(event: { taskId: number; newStatus: string }): void {
    const taskToUpdate = this.tasks.find((task) => task.id === event.taskId);
    if (taskToUpdate && this.isValidStatus(event.newStatus)) {
      taskToUpdate.status = event.newStatus as "Open" | "Pending" | "In Progress" | "Completed";
      this.taskService.updateTask(taskToUpdate);
    }
  }

  
  // onDrop(event: { taskId: number; newStatus: string }): void {
  //   const taskToUpdate = this.tasks.find((task) => task.id === event.taskId);
  //   if (taskToUpdate) {
  //     taskToUpdate.status = event.newStatus;
  //     this.taskService.updateTask(taskToUpdate);
  //   }
  // }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  private isValidStatus(status: string): status is "Open" | "Pending" | "In Progress" | "Completed" {
    return ["Open", "Pending", "In Progress", "Completed"].includes(status);
  }
}
