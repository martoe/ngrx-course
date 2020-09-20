import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';

import {AuthService} from '../auth.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {login} from '../actions/auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private store: Store,
    private router: Router) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    this.auth.login(this.form.value.email, this.form.value.password)
      .pipe(tap(user => {
        this.store.dispatch(login({user}));
        this.router.navigateByUrl('/courses');
      }))
      .subscribe(
        user => console.log('success', user),
        error => console.warn('Error', error)
      );
  }

}

