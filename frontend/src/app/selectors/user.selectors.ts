import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/user';

export interface UserState {
    user: User;
}

export interface AppState {
    feature: UserState;
}

export const selectUser = (state: AppState) => state.feature;

export const selectUserState = createSelector(
    selectUser,
    (state: UserState) => state.user
);