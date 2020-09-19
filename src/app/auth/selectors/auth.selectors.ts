import {createFeatureSelector, createSelector} from '@ngrx/store';
import {authFeatureKey, AuthState} from '../reducers/auth.reducer';

// mixture of feature-prefixed names and short names. which one is better?

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const isLoggedIn = createSelector(
  //state => state['auth'],
  selectAuthState,
  authState => !!authState.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
