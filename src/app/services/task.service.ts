import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // private tasks: Task[] = [];

  private tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: new Date(), status: 'Open' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: new Date(), status: 'Open' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', dueDate: new Date(), status: 'Open' },
    { id: 4, title: 'Task 4', description: 'Description for Task 4', dueDate: new Date(), status: 'Open' },

    { id: 5, title: 'Task 5', description: 'Description for Task 5', dueDate: new Date(), status: 'Pending' },
    { id: 6, title: 'Task 6', description: 'Description for Task 6', dueDate: new Date(), status: 'Pending' },
    { id: 7, title: 'Task 7', description: 'Description for Task 7', dueDate: new Date(), status: 'Pending' },
    { id: 8, title: 'Task 8', description: 'Description for Task 8', dueDate: new Date(), status: 'Pending' },

    { id: 9, title: 'Task 9', description: 'Description for Task 9', dueDate: new Date(), status: 'In Progress' },
    { id: 10, title: 'Task 10', description: 'Description for Task 10', dueDate: new Date(), status: 'In Progress' },
    { id: 11, title: 'Task 11', description: 'Description for Task 11', dueDate: new Date(), status: 'In Progress' },
    { id: 12, title: 'Task 12', description: 'Description for Task 12', dueDate: new Date(), status: 'In Progress' },

    { id: 13, title: 'Task 13', description: 'Description for Task 13', dueDate: new Date(), status: 'Completed' },
    { id: 14, title: 'Task 14', description: 'Description for Task 14', dueDate: new Date(), status: 'Completed' },
    { id: 15, title: 'Task 15', description: 'Description for Task 15', dueDate: new Date(), status: 'Completed' },
    { id: 16, title: 'Task 16', description: 'Description for Task 16', dueDate: new Date(), status: 'Completed' },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
