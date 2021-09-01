import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { Recipe } from '../domain/recipe.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../state/app.store';
import { selectAuthUser } from 'src/app/auth/state/auth.selectors';
import { RecipesService } from '../services/recipes.service';

@Injectable()
export class RecipesEffects {
  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes, RecipesActions.addRecipe),
      withLatestFrom(this.store.select(selectAuthUser)),
      switchMap(([_, user]) => {
        return this.recipesService.getUserRecipes(user.id);
      }),
      map((recipes: Recipe[]) => {
        return RecipesActions.setRecipes({ recipes });
      })
    )
  );

  setRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.updateRecipe, RecipesActions.addRecipe),
        withLatestFrom(this.store.select(selectAuthUser)),
        switchMap(([action, user]) => {
          return this.recipesService.addOrUpdateUserRecipe(
            action.recipe,
            user.id
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  deleteRecipe$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.deleteRecipe),
        withLatestFrom(this.store.select(selectAuthUser)),
        switchMap(([action, user]) => {
          return this.recipesService.deleteUserRecipe(action.recipe, user.id);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private recipesService: RecipesService
  ) {}
}
