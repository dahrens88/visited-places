import { ICoordinate } from "./coordinate.interface";
import { IMarker } from './marker.interface';

export interface IMap {
    zoom: number,
    coordinates: ICoordinate,
    markers: IMarker[]
}