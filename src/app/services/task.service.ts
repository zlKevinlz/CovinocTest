import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TaskInterface } from '../models/task-interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    public _httpClient : HttpClient
  ) { }

  getTasks(){
    return this._httpClient.get(`${environment.APIURL}/todos`);
  }

  addTask(task: TaskInterface){
    return this._httpClient.post(`${environment.APIURL}/todos`, task);
  }

  editTask(task: TaskInterface){
    return this._httpClient.put(`${environment.APIURL}/todos/${task.id}`, task);
  }

  deleteTask(id_task : string){
    return this._httpClient.delete(`${environment.APIURL}/todos/${id_task}`);
  }
}
