import { User } from 'src/app/models/user';
import { Action, createReducer, on } from '@ngrx/store';
import { loadUsers, createUser, createUserSuccess, loadUsersSuccess, loadUsersFailure, createUserFailure } from '../actions/user.actions';
import { DatePipe } from '@angular/common';


export const userFeatureKey = 'user';

export interface State {
  user: User
}

export const initialState: State = {
  user: {
    _id: '0', name: 'Kami', status: 'Active', gender: 'M', profileImage: 'a', password: '123', age: 21, email: '123@gmail.com', costs:
      [{ accountRepeat: 1, name: 'A', value: 300, dueDate: Date.now().toString(), payDate: Date.now().toString() }]
  }
};

const _userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ user: state.user })),
  on(loadUsersSuccess, state => state),
  on(loadUsersFailure, state => state),
  on(createUser, state => state),
  on(createUserSuccess, (state, { user }) => ({ user: user })),
  on(createUserFailure, state => state)
);
export function userReducer(state, action) {
  return _userReducer(state, action);
}