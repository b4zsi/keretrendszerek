import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    let tzoffset = (new Date(value)).getTimezoneOffset() * 60000
    let localISOTime = (new Date(Date.now() - tzoffset)).toISOString().replace('Z', '').replace('T', ' ');
    return localISOTime
  }

}
