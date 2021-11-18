import { Component } from '@angular/core';
import { IMarker } from 'src/app/model/marker.interface';

@Component({
  selector: 'app-custom-mapbox-popup',
  templateUrl: './custom-mapbox-popup.component.html',
  styleUrls: ['./custom-mapbox-popup.component.scss']
})
export class CustomMapboxPopupComponent {
  public marker: IMarker;
}
