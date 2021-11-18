import { Pipe, PipeTransform } from '@angular/core';
import { IMarker } from '../model/marker.interface';

@Pipe({
  name: 'visibleMarker'
})
export class VisibleMarkerPipe implements PipeTransform {
  transform(markers: IMarker[]): IMarker[] {
    return markers.filter(marker => marker.visible);
  }
}
