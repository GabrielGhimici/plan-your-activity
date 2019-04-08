export interface EventList {
  order: Array<any>;
  byId: any;
  loading: boolean;
  error: any;
}

export class TeamEvent {
  private static tempKey = '#$%';

  private static generateTemporaryId() {
    return TeamEvent.tempKey + Date.now();
  }

  public static isTemporaryId(id: any) {
    return `${id}`.startsWith(TeamEvent.tempKey);
  }

  public static createDefault() {
    return new TeamEvent(TeamEvent.generateTemporaryId());
  }

  constructor (
    public id: any,
    public description: string = '',
    public start_date: string = '',
    public start_time: string = '',
    public finish_date: string = '',
    public finish_time: string = '',
    public attendants: any = null
  ) {}
}

