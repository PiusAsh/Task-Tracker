import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './pages/task/task.component';
import { KanbanBoardComponent } from './pages/kanban-board/kanban-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { HttpClientModule } from '@angular/common/http';
import { UserTaskComponent } from './pages/user-task/user-task.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    KanbanBoardComponent,
    EditTaskComponent,
    DropZoneDirective,
    DraggableDirective,
    UserTaskComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
