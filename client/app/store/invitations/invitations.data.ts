import { TeamEvent } from '../event/event.data';

export interface InvitationList {
  order: Array<any>;
  byId: any;
  loading: boolean;
  responding: boolean;
  respondSuccess: boolean;
  error: any;
}

export class Invitation {
  constructor(
    public id?: any,
    public event?: TeamEvent
  ) {}
}
