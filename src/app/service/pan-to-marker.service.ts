import { BehaviorSubject, Observable } from 'rxjs';
import { IMarker } from '../model/marker.interface';

export class PanToMarkerService {
  private panToMarkerMarker: BehaviorSubject<IMarker|null>;

  constructor() {
    this.panToMarkerMarker = new BehaviorSubject<IMarker>(null);
  }

  getMarker(): Observable<IMarker|null> {
    return this.panToMarkerMarker.asObservable();
  }

  setMarker(panToMarkerMarker: IMarker): void {
    this.panToMarkerMarker.next(panToMarkerMarker);
  }
}