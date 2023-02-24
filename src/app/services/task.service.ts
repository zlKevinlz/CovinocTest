import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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

  addTask(task: any){
    return this._httpClient.post(`${environment.APIURL}/todos`, task);
  }

  deleteTask(id_task : string){
    return this._httpClient.delete(`${environment.APIURL}/todos/${id_task}`);
  }
}
