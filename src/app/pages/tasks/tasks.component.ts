import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {

  tasks: any = [];

  filterTask = '';

  success: string = '';

  constructor(
    private _taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this._taskService.getTasks().subscribe((response: any) => {
      console.log(response)
      this.tasks = response;
    })
  }

  deleteTask(task: any): void {
    this._taskService.deleteTask(task.id).subscribe((response: any) => {
      console.log(response)
      if (response != 'Not found') {
        this.success = 'Tarea borrada exitosamente';
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
    })
  }

  receiveAction(message: string): void {
    if (message) {
      this.success = message;
      this.getTasks();

      setTimeout(() => {
        this.success = '';
      }, 3000)
    }
  }

}
