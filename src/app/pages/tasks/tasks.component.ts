import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, takeUntil } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { TaskInterface } from '../../models/task-interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  tasks: TaskInterface[] = [];

  filterTask: string = '';

  message: string = '';

  pageActual: number = 1;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _taskService: TaskService,
    private spinner: NgxSpinnerService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.spinner.show();
    this._taskService.getTasks().pipe(takeUntil(this._unsubscribeAll)).subscribe((response: any) => {
      this.tasks = response;
      this.spinner.hide();
    }, (error) => {
      this.message = 'Ha ocurrido un error';
      this.clearAlert();
    });
  }

  editTask(task: TaskInterface): void {
    this._taskService.editTask(task).pipe(takeUntil(this._unsubscribeAll)).subscribe((response: any) => {
      this.message = `Tarea ${task.id} actualizada exitosamente`;
      this.getTasks();

      this.clearAlert();
    }, (error) => {
      this.message = 'Ha ocurrido un error';
      this.clearAlert();
    });
  }

  deleteTask(task: TaskInterface): void {
    this._taskService.deleteTask(task.id).pipe(takeUntil(this._unsubscribeAll)).subscribe((response: any) => {
      if (response != 'Not found') {
        this.message = 'Tarea eliminada exitosamente';
        this.getTasks();

        this.clearAlert();
      } else {
        this.message = 'Esta tarea no existe';
        this.getTasks();

        this.clearAlert();
      }
    }, (error) => {
      this.message = 'Ha ocurrido un error';
      this.clearAlert();
    });
  }

  receiveAction(message: string): void {
    if (message) {
      this.message = message;
      this.getTasks();
      this.clearAlert();
    }
  }

  search(): void{
    this.pageActual = 1;
  }

  clearAlert(): void{
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

}
