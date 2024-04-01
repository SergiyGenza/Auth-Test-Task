import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
  standalone: true,
})
export class TitlePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      if (value.startsWith('/')) {
        value = value.slice(1);
      }
      value = value.replace(/adminpanel/g, 'admin panel');
      const segments = value.split('/');
      const lastSegment = segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1);

      return lastSegment;
    }
    return value;
  }

}
