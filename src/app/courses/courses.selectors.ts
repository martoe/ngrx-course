import {createFeatureSelector, createSelector} from '@ngrx/store';
import {coursesAdapter, coursesFeatureKey, CoursesState} from './reducers/courses.reducer';
import * as fromCourses from './reducers/courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);
export const selectAllCourses = createSelector(selectCoursesState, fromCourses.selectAll);
export const selectAllCourses2 = createSelector(selectCoursesState, coursesAdapter.getSelectors().selectAll);

export const selectBeginnerCourses = createSelector(selectAllCourses,
  courses => courses.filter(course => course.category === 'BEGINNER'));

export const selectAdvancedCourses = createSelector(selectAllCourses,
  courses => courses.filter(course => course.category === 'ADVANCED'));

export const selectPromoTotal = createSelector(selectAllCourses,
  courses => courses.filter(course => course.promo).length);

export const selectAllCoursesLoaded = createSelector(selectCoursesState, state => state.allCoursesLoaded);
