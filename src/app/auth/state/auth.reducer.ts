import { createReducer, on } from '@ngrx/store';

import { User } from '../domain/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  error: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.loginStart, AuthActions.signupStart, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),

  on(AuthActions.autoLogin, (state) => ({
    ...state,
    loading: true,
  })),

  on(AuthActions.authenticateSuccess, (state, action) => ({
    ...state,
    error: null,
    loading: false,
    user: action.user,
  })),

  on(AuthActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    error: action.errorMessage,
    loading: false,
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  })),

  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  }))
);
