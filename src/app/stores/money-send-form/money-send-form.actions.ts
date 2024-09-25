import { createAction, props } from '@ngrx/store';
import { Rate } from '../../models/Rate';
import { Country } from '../../models/Country';
import { AmountType } from '../../models/AmountType';

export const convertAmountAction = createAction(
  '[Money Send Form component] Convert amount',
  props<{ amount: number | undefined | null; amountType: AmountType }>(),
);

export const convertAmountSuccessAction = createAction(
  '[Money Send Form component] Convert amount success',
  props<{
    amountConverted: number | undefined;
    amountTypeConverted: AmountType;
  }>(),
);

export const getRateAction = createAction(
  '[Money Send Form component] Get Rate',
);

export const getRateSuccessAction = createAction(
  '[Money Send Form component] Get Rate Success',
  props<{ rates: Rate[] }>(),
);

export const setCountryCodeAction = createAction(
  '[Money Send Form component] Set Country code',
  props<{ sendCountryCode: Country; receiveCountryCode: Country }>(),
);

export const getSendCountriesAction = createAction(
  '[Money Send Form component] Get Send Countries',
);

export const getReceiveCountriesAction = createAction(
  '[Money Send Form component] Get Receive Countries',
);

export const getSendCountriesSuccessAction = createAction(
  '[Money Send Form component] Get Send Countries Success',
  props<{ sendCountries: Country[] }>(),
);

export const getReceiveCountriesSuccessAction = createAction(
  '[Money Send Form component] Get Receive Countries Success',
  props<{ receiveCountries: Country[] }>(),
);

export const setSelectedSendCountryAction = createAction(
  '[Money Send Form component] Set Selected Send Country',
  props<{ selectedSendCountry: Country | null }>(),
);

export const setSelectedReceiveCountryAction = createAction(
  '[Money Send Form component] Set Selected Receive Country',
  props<{ selectedReceiveCountry: Country | null }>(),
);

export const setSelectedSendRateAction = createAction(
  '[Money Send Form component] Set Selected Send Rate',
);

export const setSelectedSendRateSuccessAction = createAction(
  '[Money Send Form component] Set Selected Send Rate Success',
  props<{ selectedSendRate: Rate | undefined }>(),
);

export const setSelectedReceiveRateAction = createAction(
  '[Money Send Form component] Set Selected Receive Rate',
);

export const setSelectedReceiveRateSuccessAction = createAction(
  '[Money Send Form component] Set Selected Receive Rate Success',
  props<{ selectedReceiveRate: Rate | undefined }>(),
);
