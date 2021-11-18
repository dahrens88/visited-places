import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { IMarker } from 'src/app/model/marker.interface';
import { MarkerServiceService } from 'src/app/service/marker.service';
import { IData } from 'src/app/model/data.interface';
import { ToggleMarkerVisibilityService } from 'src/app/service/toggle-marker-visibility.service';
import { DynamicComponentService } from 'src/app/service/dynamic-component.service';
import { CustomMapboxPopupComponent } from './custom-mapbox-popup/custom-mapbox-popup.component';
import { PanToMarkerService } from 'src/app/service/pan-to-marker.service';

@Component({
  selector: 'component-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input()
  data: IData;

  @Input()
  isDynamicallyMarkers: boolean;

  @Output()
  updatedMarkers: EventEmitter<IMarker[]> = new EventEmitter<IMarker[]>();
  
  public markers: IMarker[];

  private markerServiceService: MarkerServiceService;
  private toggleMarkerVisibilityService: ToggleMarkerVisibilityService
  private dynamicComponentService: DynamicComponentService;
  private panToMarkerService: PanToMarkerService;
  private mapBoxMap: mapboxgl.Map;

  constructor(
    markerServiceService: MarkerServiceService,
    toggleMarkerVisibilityService: ToggleMarkerVisibilityService,
    dynamicComponentService: DynamicComponentService,
    panToMarkerService: PanToMarkerService
  ) {
    this.markerServiceService = markerServiceService;
    this.toggleMarkerVisibilityService = toggleMarkerVisibilityService;
    this.dynamicComponentService = dynamicComponentService;
    this.panToMarkerService = panToMarkerService;
  }

  ngOnInit(): void {
    this.markers = this.data.map.markers;

    (mapboxgl as any).accessToken = environment.mapBox.accessToken;
      this.mapBoxMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: this.data.map.zoom,
        center: [
          this.data.map.coordinates.lng, 
          this.data.map.coordinates.lat,
        ]
    });
    this.mapBoxMap.addControl(new mapboxgl.NavigationControl());
    
    this.data.map.markers.forEach(marker => {

      if (marker.visible && marker.markerOnMap === null) {
        let popupContent = this.dynamicComponentService.injectComponent(
          CustomMapboxPopupComponent,
          data => data.marker = marker
        );

        marker.markerOnMap = this.markerServiceService.createMarker(marker);
        marker.markerOnMap.addTo(this.mapBoxMap);
        marker.markerOnMap.setPopup(
          new mapboxgl.Popup({ offset: 25, anchor: 'bottom', closeOnClick: false, closeButton: false })
            .setDOMContent(popupContent)
        )
        marker.markerOnMap.togglePopup();
      } 
    });

    this.mapBoxMap.on('moveend', () => {
      
      if (!this.isDynamicallyMarkers) {
        return;
      }

      this.data.map.markers.forEach(marker => {
        if (marker.markerOnMap !== null) {
          marker.markerOnMap.remove();
        }
        marker.visible = false;
      });

      let lngLatBounds: mapboxgl.LngLatBounds = this.mapBoxMap.getBounds();

      this.data.map.markers.forEach(marker => {
        if (lngLatBounds.contains(new mapboxgl.LngLat(marker.coordinates.lng, marker.coordinates.lat))) {
          if (marker.visible === false) {

            let popupContent = this.dynamicComponentService.injectComponent(
              CustomMapboxPopupComponent,
              data => data.marker = marker
            );

            marker.markerOnMap = this.markerServiceService.createMarker(marker);
            marker.markerOnMap.addTo(this.mapBoxMap);
            marker.markerOnMap.setPopup(
              new mapboxgl.Popup({ offset: 25, anchor: 'bottom', closeOnClick: false, closeButton: false })
              .setDOMContent(popupContent)
            )
            marker.markerOnMap.togglePopup();
            marker.visible = true;
          }
        } else {
          if (marker.markerOnMap !== null) {
            marker.markerOnMap.remove();
            marker.markerOnMap = null;
          }
        
          marker.visible = false;
        }
      });

      this.updatedMarkers.emit(this.data.map.markers);
    });

    this.toggleMarkerVisibilityService
      .isDynamicallyAddedMarker()
      .subscribe((value) => {

        if (this.mapBoxMap === null) {
          return;
        }
        
        if (value) {
          let lngLatBounds: mapboxgl.LngLatBounds = this.mapBoxMap.getBounds();
    
          this.data.map.markers.forEach(marker => {
            if (lngLatBounds.contains(new mapboxgl.LngLat(marker.coordinates.lng, marker.coordinates.lat))) {
              
              if (marker.markerOnMap === null) {
                let popupContent = this.dynamicComponentService.injectComponent(
                  CustomMapboxPopupComponent,
                  data => data.marker = marker
                );

                marker.markerOnMap = this.markerServiceService.createMarker(marker);
                marker.markerOnMap.addTo(this.mapBoxMap);
                marker.markerOnMap.setPopup(
                  new mapboxgl.Popup({ offset: 25, anchor: 'bottom', closeOnClick: false, closeButton: false })
                  .setDOMContent(popupContent)
                )
                marker.markerOnMap.togglePopup();
              }
              marker.visible = true;
    
            } else {
              if (marker.markerOnMap !== null) {
                marker.markerOnMap.remove();
                marker.markerOnMap = null;
              }
    
              marker.visible = false;
            }
          });
        } else {
          this.data.map.markers.forEach(marker => {
            if (marker.markerOnMap === null) {

              let popupContent = this.dynamicComponentService.injectComponent(
                CustomMapboxPopupComponent,
                data => data.marker = marker
              );

              marker.markerOnMap = this.markerServiceService.createMarker(marker);
              marker.markerOnMap.addTo(this.mapBoxMap);
              marker.markerOnMap.setPopup(
                new mapboxgl.Popup({ offset: 25, anchor: 'bottom', closeOnClick: false, closeButton: false })
                .setDOMContent(popupContent)
              )
              marker.markerOnMap.togglePopup();
            }
            marker.visible = true;
          });
        }
  
        this.updatedMarkers.emit(this.data.map.markers);
    });

    this.panToMarkerService
      .getMarker()
      .subscribe(marker => {

        if (marker === null) {
          return;
        }

        if (this.mapBoxMap === null) {
          return;
        }

        this.mapBoxMap.panTo(
          new mapboxgl.LngLat(marker.coordinates.lng, marker.coordinates.lat)
        );
      });
  }
}