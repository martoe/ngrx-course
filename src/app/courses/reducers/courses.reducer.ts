import {createReducer, on} from '@ngrx/store';
import {Course} from '../model/course';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {CourseActions} from '../action-types';

export const coursesFeatureKey = 'course';

// export interface CoursesState {
//   entities: { [key: number]: Course };
//   ids: number[]; // for sorting
// }
export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const coursesAdapter = createEntityAdapter<Course>({
  // selectId: course => course.id, // not needed, default
  sortComparer: (a, b) => a.seqNo - b.seqNo
});
export const initialCoursesState = coursesAdapter.getInitialState({
  allCoursesLoaded: false
});

export const coursesReducer = createReducer(
  initialCoursesState,
  // on(CourseActions.allCoursesLoaded, (state, action) => ({
  //   ...coursesAdapter.setAll(action.courses, state),
  //   allCoursesLoaded: true
  // })), // same as:
  on(CourseActions.allCoursesLoaded, (state, action) => coursesAdapter.setAll(action.courses, {
    ...state,
    allCoursesLoaded: true
  }))
);

export const {selectAll} = coursesAdapter.getSelectors();
