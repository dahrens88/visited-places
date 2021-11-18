import { ICoordinate } from './coordinate.interface';
import { IMarkerImageFile } from './marker-image-file.interface';
import * as mapboxgl from 'mapbox-gl';
import { IMarkerThumbnail } from './marker-thumbnail.interface';

export interface IMarker {
    title: string,
    descriptionShort: string,
    descriptionLong: string,
    city: string,
    country: string,
    date: string,
    coordinates: ICoordinate,
    thumbnail: IMarkerThumbnail,
    images: IMarkerImageFile[],
    visible: boolean,
    markerOnMap: mapboxgl.Marker|null,
    users: Array<number>
}