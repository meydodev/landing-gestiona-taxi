// src/app/store/downloadsCounter.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './downloadsCounter.reducer';
import { DOWNLOADS_FEATURE_KEY } from './downloadsCounter.reducer';

export const selectDownloadsState =
  createFeatureSelector<CounterState>(DOWNLOADS_FEATURE_KEY);

export const selectCounterEntity = createSelector(
  selectDownloadsState,
  (state) => state.counter // { counterDownload, updatedAt } | null
);

export const selectCounterValue = createSelector(
  selectCounterEntity,
  (c) => c?.counterDownload ?? 0
);

export const selectCounterUpdatedAt = createSelector(
  selectCounterEntity,
  (c) => c?.updatedAt ?? null
);

export const selectLoading = createSelector(
  selectDownloadsState,
  (s) => s.loading
);

export const selectError = createSelector(
  selectDownloadsState,
  (s) => s.error
);
