import { Injectable } from '@angular/core';
import { CalculationType, Rate } from '../../models/Rate';
import { delay, Observable, of } from 'rxjs';
import { GetRateUseCase } from '../../use-cases/money/get-rate.use-cases';
import { GetCountriesUseCase } from '../../use-cases/money/get-countries.use-cases';
import { Country } from '../../models/Country';

@Injectable({ providedIn: 'root' })
export class MoneyService implements GetRateUseCase, GetCountriesUseCase {
  getSendCountries(): Observable<Country[]> {
    return of([
      { code: 'CA', name: 'Canada', currency: 'CAD' },
    ] as Country[]).pipe(delay(3000));
  }

  getReceiveCountries(): Observable<Country[]> {
    return of([
      { code: 'CMR', name: 'Cameroon', currency: 'XAF' },
    ] as Country[]).pipe(delay(3000));
  }

  public getRate(): Observable<Rate> {
    return of({
      'CA->CMR': { value: 440, calculationType: CalculationType.Multiply },
      'CMR->CA': { value: 440, calculationType: CalculationType.Divide },
    });
  }
}
