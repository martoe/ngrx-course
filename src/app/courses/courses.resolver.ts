import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {CourseActions} from './action-types';
import {selectAllCoursesLoaded} from './courses.selectors';

@Injectable()
export class CoursesResolver implements Resolve<any> {

  /** to prevent multiple executions because the resolver is triggered multiple times during navigation */
  private loading = false;

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe( // TODO why store.pipe?
      select(selectAllCoursesLoaded),
      tap(coursesLoaded => {
        if (!this.loading && !coursesLoaded) {
          this.loading = true;
          console.log('dispatching');
          this.store.dispatch(CourseActions.loadAllCourses());
          console.log('dispatched');
        }
      }),
      filter(coursesLoaded => coursesLoaded), // wait until the "loadAllCourses" action has been completed
      first(),
      finalize(() => {
        this.loading = false;
        console.log('finalized');
      })
    );
  }

}
