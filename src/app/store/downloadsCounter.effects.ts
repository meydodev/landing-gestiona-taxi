import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CounterActions from './downloadsCounter.actions';
import { HomeService } from '../core/services/home.service'; // tu servicio
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CounterEffects {
  constructor(private actions$: Actions, private homeService: HomeService) {}

  // cargar contador
  loadCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.loadCounter),
      mergeMap(() =>
        this.homeService.getDownloadsCounter().pipe(
          map(counter => CounterActions.loadCounterSuccess({ counter })),
          catchError(error => of(CounterActions.loadCounterFailure({ error })))
        )
      )
    )
  );

  // incrementar contador
  incrementCounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.incrementCounter),
      mergeMap(() =>
        this.homeService.addDownloadCounter().pipe(
          map(counter => CounterActions.incrementCounterSuccess({ counter })),
          catchError(error => of(CounterActions.incrementCounterFailure({ error })))
        )
      )
    )
  );
}
