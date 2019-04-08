import { eventReducer } from './event.reducer';
import { defaultState, eventsById, payloadEvents } from './event.reducer.test-data';
import { EventActions } from './event.actions';

describe('Event reducer', () => {
  it('should treat unknown action', () => {
    const result = eventReducer(defaultState, {type: 'SOME_STUFF'});
    expect(result).toEqual(defaultState);
  });

  it('should treat EVENT_LOAD_START', () => {
    const result = eventReducer(defaultState, {type: EventActions.EVENTS_LOAD_START});
    const expected = {
      order: [],
      byId: {},
      loading: true,
      saving: false,
      deleting: false,
      saveSuccess: false,
      deleteSuccess: false,
      error: null
    };
    expect(result).toEqual(expected);
  });

  it('should treat EVENT_LOAD_FAILED', () => {
    const result = eventReducer(defaultState, {type: EventActions.EVENTS_LOAD_FAILED, error: new Error()});
    const expected = {
      order: [],
      byId: {},
      loading: false,
      saving: false,
      deleting: false,
      saveSuccess: false,
      deleteSuccess: false,
      error: new Error()
    };
    expect(result).toEqual(expected);
  });

  it('should treat EVENT_LOAD_SUCCEEDED, undefined payload', () => {
    const result = eventReducer(defaultState, {type: EventActions.EVENTS_LOAD_SUCCEEDED, payload: undefined});
    const expected = {
      order: [],
      byId: {},
      loading: false,
      saving: false,
      deleting: false,
      saveSuccess: false,
      deleteSuccess: false,
      error: null
    };
    expect(result).toEqual(expected);
  });

  it('should treat EVENT_LOAD_SUCCEEDED, empty payload', () => {
    const result = eventReducer(defaultState, {type: EventActions.EVENTS_LOAD_SUCCEEDED, payload: []});
    const expected = {
      order: [],
      byId: {},
      loading: false,
      saving: false,
      deleting: false,
      saveSuccess: false,
      deleteSuccess: false,
      error: null
    };
    expect(result).toEqual(expected);
  });

  it('should treat EVENT_LOAD_SUCCEEDED, populated payload', () => {
    const result = eventReducer(defaultState, {type: EventActions.EVENTS_LOAD_SUCCEEDED, payload: payloadEvents});
    const expected = {
      order: ['1', '4'],
      byId: eventsById,
      loading: false,
      saving: false,
      deleting: false,
      saveSuccess: false,
      deleteSuccess: false,
      error: null
    };
    expect(result).toEqual(expected);
  });
});
