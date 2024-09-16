import { Injectable } from '@angular/core';
import { CalculationType, Rate } from '../../models/Rate';
import { delay, filter, from, map, mergeMap, Observable, of, take } from 'rxjs';
import { GetRateUseCase } from '../../use-cases/money/get-rate.use-cases';
import { GetCountriesUseCase } from '../../use-cases/money/get-countries.use-cases';
import { Country } from '../../models/Country';
import { ConvertAmountUseCase } from '../../use-cases/money/convert-amount.use-cases';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Money } from '../../models/Money';
import { AmountType } from '../../models/AmountType';
import {
  selectRates,
  selectReceiveAmountRateType,
  selectSelectedReceiveRate,
  selectSelectedSendRate,
  selectSendAmountRateType,
} from '../../stores/money-send-form/money-send-form.selector';

@Injectable({ providedIn: 'root' })
export class MoneyService
  implements GetRateUseCase, GetCountriesUseCase, ConvertAmountUseCase
{
  constructor(private store: Store<AppState>) {}

  public getSendCountries(): Observable<Country[]> {
    return of([
      { code: 'CA', name: 'Canada', currency: 'CAD' },
    ] as Country[]).pipe(delay(3000));
  }

  public getReceiveCountries(): Observable<Country[]> {
    return of([
      { code: 'CMR', name: 'Cameroon', currency: 'XAF' },
    ] as Country[]).pipe(delay(3000));
  }

  public getRate(): Observable<Rate[]> {
    return of([
      {
        type: 'CA->CMR',
        value: 440,
        calculationType: CalculationType.Multiply,
      },
      { type: 'CMR->CA', value: 440, calculationType: CalculationType.Divide },
    ]);
  }

  public getSendRateFromState(): Observable<Rate | undefined> {
    return this.getSendAmountRateType().pipe(
      mergeMap((rateType) => {
        if (!rateType) return of(undefined);
        return this.findRateByType(rateType);
      })
    );
  }

  public getReceiveRateFromState(): Observable<Rate | undefined> {
    return this.getReceiveAmountRateType().pipe(
      mergeMap((rateType) => {
        if (!rateType) return of(undefined);
        return this.findRateByType(rateType);
      })
    );
  }

  public convertAmount(
    amount: number | undefined,
    amountType: AmountType
  ): Observable<number | undefined> {
    return this.getSelectedRateByAmountType(amountType).pipe(
      map((rate) => {
        if (!rate || typeof amount !== 'number') return undefined;
        return this.convert(amount, rate);
      })
    );
  }

  private convert(amount: number, rate: Rate): number {
    return Money.convert(amount, rate);
  }

  private getSendAmountRateType() {
    return this.store.select(selectSendAmountRateType).pipe(take(1));
  }

  private getReceiveAmountRateType() {
    return this.store.select(selectReceiveAmountRateType).pipe(take(1));
  }

  private findRateByType(rateType: string) {
    return this.store.select(selectRates).pipe(
      take(1),
      map((rates) => {
        if (!rates) return undefined;
        return rates.find((rate) => rate.type === rateType);
      })
    );
  }

  private getSelectedRateByAmountType(
    amountType: AmountType
  ): Observable<Rate | undefined> {
    switch (amountType) {
      case AmountType.Send:
        return this.getSelectedSendRateFromState();
      case AmountType.Receive:
        return this.getSelectedReceiveRateFromState();
      default:
        return of(undefined);
    }
  }

  private getSelectedSendRateFromState(): Observable<Rate | undefined> {
    return this.store.select(selectSelectedSendRate).pipe(take(1));
  }

  private getSelectedReceiveRateFromState(): Observable<Rate | undefined> {
    return this.store.select(selectSelectedReceiveRate).pipe(take(1));
  }
}
