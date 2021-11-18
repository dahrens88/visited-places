import { Injectable } from '@angular/core';
import { IData } from '../model/data.interface';
import * as data from '../../assets/data.json';

@Injectable()
export class DataProviderService {
  private dataModel: IData = (data as any).default;

    public getData(): IData {
        return this.dataModel;
    }
}
