import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

 
  task!: any;
  taskForm!: FormGroup;
  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const taskId = +this.route.snapshot.paramMap.get('id')!;
    this.task = this.taskService.getTaskById(taskId); 

    this.taskForm = this.formBuilder.group({
      title: [this.task.title],
      description: [this.task.description],
      dueDate: [this.task.dueDate],
    });
  }

  onUpdateTask1(): void {
    this.taskService.updateTask(this.task);
    this.router.navigate(['/edit-task', this.task.id]);
  }

  onUpdateTask(): void {
    const updatedTask: Task = { ...this.task, ...this.taskForm.value };
    this.taskService.updateTask(updatedTask);
    this.router.navigate(['/task']);
  }
  onDeleteTask(): void {
    this.taskService.deleteTask(this.task.id);
    alert('Tasked Deleted Successfully');
    this.router.navigate(['/task']);
  }
}
