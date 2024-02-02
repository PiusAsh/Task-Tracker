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

  task!: Task;
  taskForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const taskId = +this.route.snapshot.paramMap.get('id')!;
  
    this.taskService.getTaskById(taskId).subscribe(
      (task) => {
        this.task = task;
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
        });
      },
      (error) => {
        console.error('Error fetching task:', error);
      }
    );

    this.taskForm = this.formBuilder.group({
      title: [''],
      description: [''],
      dueDate: [''],
    });
  }

  onUpdateTask(): void {
    const updatedTask: Task = { ...this.task, ...this.taskForm.value };
    this.taskService.updateTask(updatedTask).subscribe(
      () => {
        alert('Task Updated Successfully');
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error updating task:', error);
      }
    );
  }

  onDeleteTask(): void {
    this.taskService.deleteTask(this.task.id).subscribe(
      () => {
        alert('Task Deleted Successfully');
        this.router.navigate(['/task']);
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }
}
