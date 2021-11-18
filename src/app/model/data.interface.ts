import { IMap } from './map.interface';
import { IUser } from './user.interface';

export interface IData {
    users: IUser[],
    map: IMap
}