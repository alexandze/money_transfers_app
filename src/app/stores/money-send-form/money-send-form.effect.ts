import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetRateUseCase } from '../../use-cases/money/get-rate.use-cases';
import {
  getRateAction,
  getRateSuccessAction,
  getReceiveCountriesAction,
  getReceiveCountriesSuccessAction,
  getSendCountriesAction,
  getSendCountriesSuccessAction,
} from './money-send-form.actions';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { GET_COUNTRY_USE_CASE, GET_RATE_USE_CASE } from '../../injection-token';
import { GetCountriesUseCase } from '../../use-cases/money/get-countries.use-cases';

@Injectable()
export class MoneySendFormEffect {
  constructor(
    private actions$: Actions,
    @Inject(GET_RATE_USE_CASE) private getRateUseCase: GetRateUseCase,
    @Inject(GET_COUNTRY_USE_CASE) private getCountryUseCase: GetCountriesUseCase
  ) {}

  getRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRateAction),
      switchMap(() => this.getRateUseCase.getRate()),
      map((rate) => getRateSuccessAction({ rate })),
      catchError(() => EMPTY)
    )
  );

  getSendCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSendCountriesAction),
      switchMap(() => this.getCountryUseCase.getSendCountries()),
      map((sendCountries) => getSendCountriesSuccessAction({ sendCountries }))
    )
  );

  getReceiveCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getReceiveCountriesAction),
      switchMap(() => this.getCountryUseCase.getReceiveCountries()),
      map((receiveCountries) =>
        getReceiveCountriesSuccessAction({ receiveCountries })
      )
    )
  );
}
