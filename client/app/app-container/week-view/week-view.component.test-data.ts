import * as moment from 'moment';
import { CalendarDate } from './week-view.component';

export function expectedWeekDate(): CalendarDate[] {
  return [{
      today: false,
      hasEvent: false,
      teamEvent: null,
      startMoment: moment('2018-12-30T00:00:00'),
      endMoment: moment('2018-12-30T00:00:00'),
    }, {
      today: false,
      hasEvent: false,
      teamEvent: null,
      startMoment: moment('2018-12-31T00:00:00'),
      endMoment: moment('2018-12-31T00:00:00')
    }, {
      today: false,
      hasEvent: false,
      teamEvent: null,
      startMoment: moment('2019-01-01T00:00:00'),
      endMoment: moment('2019-01-01T00:00:00')
    }, {
      today: false,
      hasEvent: false,
      teamEvent: null,
      startMoment: moment('2019-01-02T00:00:00'),
      endMoment: moment('2019-01-02T00:00:00')
    }, {
      today: false,
      hasEvent: false,
      teamEvent: null,
      startMoment: moment('2019-01-03T00:00:00'),
      endMoment: moment('2019-01-03T00:00:00')
    }, {
      today: false,
      hasEvent: false,
      teamEvent: null,
      startMoment: moment('2019-01-04T00:00:00'),
      endMoment: moment('2019-01-04T00:00:00')
    }, {
      today: false,
      hasEvent: false,
      teamEvent: null,
      startMoment: moment('2019-01-05T00:00:00'),
      endMoment: moment('2019-01-05T00:00:00')
    }
  ];
}
