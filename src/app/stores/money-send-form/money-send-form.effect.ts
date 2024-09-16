import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GetRateUseCase } from '../../use-cases/money/get-rate.use-cases';
import {
  convertAmountAction,
  convertAmountSuccessAction,
  getRateAction,
  getRateSuccessAction,
  getReceiveCountriesAction,
  getReceiveCountriesSuccessAction,
  getSendCountriesAction,
  getSendCountriesSuccessAction,
  setSelectedReceiveRateAction,
  setSelectedReceiveRateSuccessAction,
  setSelectedSendRateAction,
  setSelectedSendRateSuccessAction,
} from './money-send-form.actions';
import { catchError, EMPTY, map, of, switchMap, zip } from 'rxjs';
import {
  CONVERT_AMOUNT_USE_CASE,
  GET_COUNTRY_USE_CASE,
  GET_RATE_USE_CASE,
} from '../../injection-token';
import { GetCountriesUseCase } from '../../use-cases/money/get-countries.use-cases';
import { ConvertAmountUseCase } from '../../use-cases/money/convert-amount.use-cases';
import { AmountType } from '../../models/AmountType';

@Injectable()
export class MoneySendFormEffect {
  constructor(
    private actions$: Actions,
    @Inject(GET_RATE_USE_CASE) private getRateUseCase: GetRateUseCase,
    @Inject(GET_COUNTRY_USE_CASE)
    private getCountryUseCase: GetCountriesUseCase,
    @Inject(CONVERT_AMOUNT_USE_CASE)
    private convertAmountUseCase: ConvertAmountUseCase
  ) {}

  public getRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRateAction),
      switchMap(() => this.getRateUseCase.getRate()),
      map((rates) => getRateSuccessAction({ rates })),
      catchError(() => EMPTY)
    )
  );

  public setSelectedSendRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSelectedSendRateAction),
      switchMap(() => this.getRateUseCase.getSendRateFromState()),
      map((selectedSendRate) =>
        setSelectedSendRateSuccessAction({ selectedSendRate })
      )
    )
  );

  public setSelectedReceiveRate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setSelectedReceiveRateAction),
      switchMap(() => this.getRateUseCase.getReceiveRateFromState()),
      map((selectedReceiveRate) =>
        setSelectedReceiveRateSuccessAction({ selectedReceiveRate })
      )
    )
  );

  public getSendCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSendCountriesAction),
      switchMap(() => this.getCountryUseCase.getSendCountries()),
      map((sendCountries) => getSendCountriesSuccessAction({ sendCountries }))
    )
  );

  public getReceiveCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getReceiveCountriesAction),
      switchMap(() => this.getCountryUseCase.getReceiveCountries()),
      map((receiveCountries) =>
        getReceiveCountriesSuccessAction({ receiveCountries })
      )
    )
  );

  public convertAmount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(convertAmountAction),
      switchMap(({ amount, amountType }) =>
        this.convertAmountUseCase.convertAmount(amount, amountType).pipe(
          map((amountConverted) => ({
            amountConverted,
            amountTypeConverted:
              amountType === AmountType.Send
                ? AmountType.Receive
                : AmountType.Send,
          }))
        )
      ),
      map(({ amountConverted, amountTypeConverted }) =>
        convertAmountSuccessAction({
          amountConverted: amountConverted,
          amountTypeConverted,
        })
      )
    )
  );
}
