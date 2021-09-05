import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OverlayModule } from '@angular/cdk/overlay';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideAuth,
  getAuth,
  browserLocalPersistence,
} from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import * as fromApp from './state/app.store';
import { AuthEffects } from './auth/state/auth.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { ShoppingListEffects } from './shopping-list/state/shopping-list.effects';
import { metaReducers } from './state/meta.reducers';
import { CoreEffects } from './core/state/core.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    OverlayModule,
    StoreModule.forRoot(fromApp.appReducer, {
      metaReducers: metaReducers,
    }),
    EffectsModule.forRoot([CoreEffects, AuthEffects, ShoppingListEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => {
      const auth = getAuth();
      auth.setPersistence(browserLocalPersistence);
      return auth;
    }),
    provideFirestore(() => getFirestore()),
    CoreModule,
    LayoutModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
