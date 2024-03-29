import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanBoardComponent } from './pages/kanban-board/kanban-board.component';
import { TaskComponent } from './pages/task/task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { UserTaskComponent } from './pages/user-task/user-task.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: KanbanBoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit-task/:id', component: EditTaskComponent },
  { path: 'user-task', component: UserTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
