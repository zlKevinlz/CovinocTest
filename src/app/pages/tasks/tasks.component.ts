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

  filterTask = '';

  success: string = '';

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
    });
  }

  editTask(task: TaskInterface): void {
    this._taskService.editTask(task).pipe(takeUntil(this._unsubscribeAll)).subscribe((response: any) => {
      this.success = `Tarea ${task.id} actualizada exitosamente`;
      this.getTasks();

      setTimeout(() => {
        this.success = '';
      }, 3000)
    });
  }

  deleteTask(task: TaskInterface): void {
    this._taskService.deleteTask(task.id).pipe(takeUntil(this._unsubscribeAll)).subscribe((response: any) => {
      if (response != 'Not found') {
        this.success = 'Tarea eliminada exitosamente';
        this.getTasks();

        setTimeout(() => {
          this.success = '';
        }, 3000)
      } else {
        this.success = 'Esta tarea no existe';
        this.getTasks();

        setTimeout(() => {
          this.success = '';
        }, 3000)
      }
    });
  }

  receiveAction(message: string): void {
    if (message) {
      this.success = message;
      this.getTasks();

      setTimeout(() => {
        this.success = '';
      }, 3000);
    }
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

}
