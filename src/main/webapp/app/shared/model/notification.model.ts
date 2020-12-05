import { IAddress } from 'app/shared/model/address.model';

export interface INotification {
  id?: number;
  description?: string;
  names?: IAddress[];
}

export class Notification implements INotification {
  constructor(public id?: number, public description?: string, public names?: IAddress[]) {}
}
