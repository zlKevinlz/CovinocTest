import { TaskService } from 'src/app/services/task.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;

  @Output()
  emitAction = new EventEmitter<string>();

  constructor(
    private _formbuilder: FormBuilder,
    private _taskService: TaskService
  ) {
    this.taskForm = this._formbuilder.group({
      title: new FormControl('', Validators.required),
      state: new FormControl(false)
    });
  }

  ngOnInit(): void {
  }

  //agregar validacion si response es de tipo task
  addTask(){
    this._taskService.addTask(this.taskForm.value).subscribe( (response: any) => {
      console.log(response)
      this.emitAction.emit('Tarea creada exitosamente')
      this.taskForm.reset();
    })
  }

}
