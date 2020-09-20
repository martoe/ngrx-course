import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private router: Router) {
    // // first try:
    // actions$.subscribe(action => {
    //   if (action.type === '[Auth] User login') {
    //     localStorage.setItem('user', JSON.stringify(action['user']));
    //   }
    // });

    // // second try:
    // actions$.pipe(
    //   ofType(AuthActions.login),
    //   tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
    // ).subscribe();
  }

  // third try:
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
    );
  }, {dispatch: false});

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
      })
    );
  }, {dispatch: false});
}
