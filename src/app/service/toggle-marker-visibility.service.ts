import { BehaviorSubject, Observable } from 'rxjs';

export class ToggleMarkerVisibilityService {
  private dynamicallyAddedMarker: BehaviorSubject<boolean>;

  constructor() {
    this.dynamicallyAddedMarker = new BehaviorSubject<boolean>(false);
  }

  isDynamicallyAddedMarker(): Observable<boolean> {
    return this.dynamicallyAddedMarker.asObservable();
  }

  setDynamicallyAddedMarker(dynamicallyAddedMarker: boolean): void {
    this.dynamicallyAddedMarker.next(dynamicallyAddedMarker);
  }
}