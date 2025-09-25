import { DownloadCounter } from './../models/downlodas';
import { createAction,props } from "@ngrx/store";



export const loadCounter = createAction('[Downloads] Load Counter');
export const loadCounterSuccess = createAction(
  '[Downloads] Load Counter Success',
  props<{ counter: DownloadCounter }>()
);
export const loadCounterFailure = createAction(
  '[Downloads] Load Counter Failure',
  props<{ error: unknown }>()
);

// Incrementar contador en backend
export const incrementCounter = createAction('[Downloads] Increment Counter');
export const incrementCounterSuccess = createAction(
  '[Downloads] Increment Counter Success',
  props<{ counter: DownloadCounter }>()
);
export const incrementCounterFailure = createAction(
  '[Downloads] Increment Counter Failure',
  props<{ error: unknown }>()
);
