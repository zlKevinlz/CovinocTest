import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultTasks = [];
    for (const task of value) {
      if (task.title.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultTasks.push(task);
      };
    };
    return resultTasks;
  }


}