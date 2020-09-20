import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import * as AuthActions from './auth/actions/auth.actions';
import * as AuthSelectors from './auth/selectors/auth.selectors';
import {User} from './auth/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loading = true;
  loggedIn$: Observable<boolean>;

  constructor(private router: Router,
              private store: Store) {
  }

  ngOnInit() {
    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      const user: User = JSON.parse(userProfile);
      this.store.dispatch(AuthActions.login({user}));
    }
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    this.loggedIn$ = this.store.pipe(
      // map(state => !!state['auth'].user),
      // distinctUntilChanged()
      select(AuthSelectors.isLoggedIn)
    );
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
