import { Component, OnInit } from '@angular/core';
import { applyGlobalSearch } from 'src/app/helpers/table-search';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  searchText: string = '';
  filteredRows: any;
  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
    this.filteredRows = this.taskService.getTasks();
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

  applyFilter() {
    this.filteredRows = applyGlobalSearch(
      this.tasks,
      this.searchText,
      ['title', 'description', 'dueDate', 'status']
    );

  }
  filterTasksByStatus(status: string): Task[] {
    return this.filteredRows.filter((task: any) => task.status === status);
  }
  clearSearch(){
    this.searchText = '';
    this.tasks = this.taskService.getTasks();
    this.filteredRows = this.taskService.getTasks();
  }
  
  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  private isValidStatus(status: string): status is "Open" | "Pending" | "In Progress" | "Completed" {
    return ["Open", "Pending", "In Progress", "Completed"].includes(status);
  }
}
