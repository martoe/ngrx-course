import {createReducer, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import {User} from '../model/user.model';

// here the exported names contain the feature name - so use straight imports
// ...but the NG scaffolder has created names without feature name ("State", "initialState", " reducer"), is it better that way?

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state, action) => ({
    ...state,
    user: action.user
  })),

  on(AuthActions.logout, state => ({
    ...state,
    user: undefined
  }))
);
