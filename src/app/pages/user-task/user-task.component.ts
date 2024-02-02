import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { applyGlobalSearch } from 'src/app/helpers/table-search';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit {

  searchText: string = '';
  filteredRows!: Task[];
  tasks!: Task[];
  userName: any;
  constructor(private taskService: TaskService, private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    const currentUser = this.userService.getCurrentUser();

    this.userName = currentUser?.username;

    if (currentUser) {
      this.taskService.getTasksByUserId(currentUser.id).subscribe((tasks) => {
        this.tasks = tasks;
        this.filteredRows = tasks;
      });
    }
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
logout(){
  this.userService.clearCurrentUser();
  this.router.navigate(['']);
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
