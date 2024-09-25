import { InjectionToken } from '@angular/core';
import { GetRateUseCase } from './use-cases/money/get-rate.use-cases';
import { GetCountriesUseCase } from './use-cases/money/get-countries.use-cases';
import { ConvertAmountUseCase } from './use-cases/money/convert-amount.use-cases';

export const GET_RATE_USE_CASE = new InjectionToken<GetRateUseCase>(
  'GetRateUseCase',
);

export const GET_COUNTRY_USE_CASE = new InjectionToken<GetCountriesUseCase>(
  'GetCountryUseCase',
);

export const CONVERT_AMOUNT_USE_CASE = new InjectionToken<ConvertAmountUseCase>(
  'ConvertAmountUseCase',
);
