import { INotification } from 'app/shared/model/notification.model';

export interface IAddress {
  id?: number;
  name?: string;
  sipNumber?: string;
  description?: string;
  notification?: INotification;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public name?: string,
    public sipNumber?: string,
    public description?: string,
    public notification?: INotification
  ) {}
}
