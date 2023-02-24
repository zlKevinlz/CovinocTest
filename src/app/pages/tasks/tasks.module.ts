import { TaskFormComponent } from './../../components/task-form/task-form.component';
import { HeaderComponent } from './../../components/header/header.component';
import { TasksComponent } from './tasks.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [TasksComponent, HeaderComponent, TaskFormComponent, FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class TasksModule { }
