import { Action } from '@ngrx/store';
import { RegisterService } from './../components/register/register.service';
import { HomeService } from './../components/home/home.service';
import { User } from '../models/user';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './../actions/user.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs'
import { mergeMap, map, catchError } from 'rxjs/operators'


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
    private registerService: RegisterService) { }
  @Effect()
  signupUser$: Observable<Action> = this.actions$.pipe(
    ofType(loadUsersSuccess),
    mergeMap(
      action => this.registerService.getAllUsers().pipe(
        map(users => (loadUsersSuccess({ user: users }))),
        catchError(err => of(loadUsersFailure({ error: err })))
      )
    )
  )
}
