export const defaultState = {
  order: [],
  byId: {},
  loading: false,
  saving: false,
  deleting: false,
  saveSuccess: false,
  deleteSuccess: false,
  error: null
};

export const payloadEvents = [{
    attendants: {},
    creator: 'admin',
    description: 'test',
    finish_date: '2017-11-29',
    finish_time: '15:30:00',
    id: 1,
    start_date: '2017-11-29',
    start_time: '15:00:00'
  }, {
    attendants: {
      attendants: [{
        id: 1,
        name: 'admin'
      }]
    },
    creator: 'usersul',
    description: 'Daily',
    finish_date: '2017-12-01',
    finish_time: '11:45:00',
    id: 4,
    start_date: '2017-12-01',
    start_time: '11:30:00'
  }
];

export const eventsById = {
  '1': {
    attendants: {
      attendants: [{
        id: -1,
        name: 'admin'
      }]
    },
    creator: 'admin',
    description: 'test',
    finish_date: '2017-11-29',
    finish_time: '15:30:00',
    id: 1,
    start_date: '2017-11-29',
    start_time: '15:00:00',
    deleted: false
  },
  '4': {
    attendants: {
      attendants: [{
        id: 1,
        name: 'admin'
      }, {
        id: -1,
        name: 'usersul'
      }]
    },
    creator: 'usersul',
      description: 'Daily',
    finish_date: '2017-12-01',
    finish_time: '11:45:00',
    id: 4,
    start_date: '2017-12-01',
    start_time: '11:30:00',
    deleted: false
  }
};
