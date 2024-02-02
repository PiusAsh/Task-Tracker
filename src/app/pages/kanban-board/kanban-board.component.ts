import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { applyGlobalSearch } from 'src/app/helpers/table-search';


@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
})
export class KanbanBoardComponent implements OnInit {
  searchText: string = '';
  filteredRows!: Task[];
  tasks!: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.filteredRows = tasks;
    });
  }

  updateTask(updatedTask: any): void {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.fetchTasks();
    });
  }

  deleteTask(taskId: any): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.fetchTasks();
    });
  }

  onDrop(event: { taskId: number; newStatus: string }): void {
    const taskToUpdate = this.tasks.find((task) => task.id === event.taskId);

    if (taskToUpdate && this.isValidStatus(event.newStatus)) {
      taskToUpdate.status = event.newStatus as "Open" | "Pending" | "In Progress" | "Completed";

      this.taskService.updateTask(taskToUpdate).subscribe(() => {
        this.fetchTasks();
      });
    }
  }

  applyFilter(): void {
    this.filteredRows = applyGlobalSearch(
      this.tasks,
      this.searchText,
      ['title', 'description', 'dueDate', 'status']
    );
  }

  clearSearch(): void {
    this.searchText = '';
    this.fetchTasks();
  }


  filterTasksByStatus(status: string): Task[] {
    return this.filteredRows.filter((task: any) => task.status === status);
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  private isValidStatus(status: string): status is "Open" | "Pending" | "In Progress" | "Completed" {
    return ["Open", "Pending", "In Progress", "Completed"].includes(status);
  }
}
