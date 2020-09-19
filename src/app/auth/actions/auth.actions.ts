import {createAction, props} from '@ngrx/store';
import {User} from '../model/user.model';

// exported names don't contain the feature name - so import them into a variable:
//    import * as AuthActions from '../actions/auth.actions';

export const login = createAction(
  '[Auth] User login',
  props<{ user: User }>()
);

export const logout = createAction(
  '[Auth] User logout'
);
