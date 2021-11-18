import { Component } from '@angular/core';
import { DataProviderService } from 'src/app/service/data-provider.service';
import { IData } from './model/data.interface';
import { IMarker } from './model/marker.interface';
import { IMap } from './model/map.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title: string = 'visited-places';
  public data: IData;
  public isDynamicallyMarkers: boolean = false;

  public navigationMarkers: IMarker[] = [];

  private dataProviderService: DataProviderService;

  constructor(dataProviderService: DataProviderService) {
      this.dataProviderService = dataProviderService;
  }

  ngOnInit(): void {
    this.data = this.dataProviderService.getData();
    this.data.map.markers.forEach(marker => {
      marker.visible = true;
      marker.markerOnMap = null;
    });

    this.navigationMarkers = Object.assign([], this.data.map.markers);
  }

  public onToggleNavigation(isDynamicallyMarkers: boolean): void {
    this.isDynamicallyMarkers = isDynamicallyMarkers;
  }

  public updateMarkers(markers: IMarker[]): void {
    this.navigationMarkers = Object.assign([], markers);
  }
}
