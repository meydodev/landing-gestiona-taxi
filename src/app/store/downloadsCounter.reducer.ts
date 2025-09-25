// downloadsCounter.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './downloadsCounter.actions';

export interface DownloadCounter {
  counterDownload: number;
  updatedAt: string;
}

export interface CounterState {
  counter: DownloadCounter | null;
  loading: boolean;
  error: unknown;
}

export const initialState: CounterState = {
  counter: null,
  loading: false,
  error: null,
};

export const counterReducer = createReducer(
  initialState,

  // load
  on(CounterActions.loadCounter, (s) => ({ ...s, loading: true, error: null })),
  on(CounterActions.loadCounterSuccess, (s, { counter }) => ({ ...s, counter, loading: false })),
  on(CounterActions.loadCounterFailure, (s, { error }) => ({ ...s, error, loading: false })),

  // increment
  on(CounterActions.incrementCounter, (s) => ({ ...s, loading: true })),
  on(CounterActions.incrementCounterSuccess, (s, { counter }) => ({ ...s, counter, loading: false })),
  on(CounterActions.incrementCounterFailure, (s, { error }) => ({ ...s, error, loading: false })),
);


export const DOWNLOADS_FEATURE_KEY = 'downloads';
