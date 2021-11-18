import * as mapboxgl from 'mapbox-gl';
import { IMarker } from '../model/marker.interface';

export class MarkerServiceService {

  public createMarker(
    marker: IMarker
  ): mapboxgl.Marker {

    return new mapboxgl.Marker()
      .setLngLat([
        marker.coordinates.lng,
        marker.coordinates.lat,
      ]);
  }

  public removeAllMarkers(markers: mapboxgl.Marker[]): void {
    markers.forEach(marker => {
      marker.remove();
    });
  }

  public removeMarker(marker: mapboxgl.Marker): void {
    marker.remove();
  }
}