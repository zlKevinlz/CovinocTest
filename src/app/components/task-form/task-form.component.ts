import { TaskService } from 'src/app/services/task.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;

  @Output()
  emitAction = new EventEmitter<string>();

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _formbuilder: FormBuilder,
    private _taskService: TaskService
  ) {
    this._unsubscribeAll = new Subject();

    this.taskForm = this._formbuilder.group({
      title: new FormControl('', Validators.required),
      state: new FormControl(false)
    });
  }

  ngOnInit(): void {
  }

  //agregar validacion si response es de tipo task
  addTask(): void{
    this._taskService.addTask(this.taskForm.value).pipe(takeUntil(this._unsubscribeAll)).subscribe( (response: any) => {
      this.emitAction.emit('Tarea creada exitosamente')
      this.taskForm.reset();
    }, (error) => {
      this.emitAction.emit('Ha ocurrido un error')
    })
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

}
