import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  MONEY_SEND_FORM_STATE_NAME,
  moneySendFormReducer,
} from './stores/money-send-form/money-send-form.reducer';
import { MoneySendFormEffect } from './stores/money-send-form/money-send-form.effect';
import {
  CALCULATE_TOTAL_USE_CASE,
  CONVERT_AMOUNT_USE_CASE,
  GET_COUNTRY_USE_CASE,
  GET_RATE_USE_CASE,
} from './injection-token';
import { MoneyService } from './services/money/money.service';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideStore(),
    provideState({
      name: MONEY_SEND_FORM_STATE_NAME,
      reducer: moneySendFormReducer,
    }),
    provideEffects(MoneySendFormEffect),
    { provide: GET_RATE_USE_CASE, useClass: MoneyService },
    { provide: GET_COUNTRY_USE_CASE, useClass: MoneyService },
    { provide: CONVERT_AMOUNT_USE_CASE, useClass: MoneyService },
    { provide: CALCULATE_TOTAL_USE_CASE, useClass: MoneyService },
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
