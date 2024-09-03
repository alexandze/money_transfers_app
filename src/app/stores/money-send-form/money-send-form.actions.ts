import { createAction, props } from '@ngrx/store';
import { Rate } from '../../models/Rate';
import { Country } from '../../models/Country';

export const convertSendValueToReceiveValueAction = createAction(
  '[Money Send Form component] Convert Send Value To Receive Value',
  props<{ sendAmount: number }>()
);

export const getRateAction = createAction(
  '[Money Send Form component] Get Rate'
);

export const getRateSuccessAction = createAction(
  '[Money Send Form component] Get Rate Success',
  props<{ rate: Rate }>()
);

export const setCountryCodeAction = createAction(
  '[Money Send Form component] Set Country code',
  props<{ sendCountryCode: Country; receiveCountryCode: Country }>()
);

export const getSendCountriesAction = createAction(
  '[Money Send Form component] Get Send Countries'
);

export const getReceiveCountriesAction = createAction(
  '[Money Send Form component] Get Receive Countries'
);

export const getSendCountriesSuccessAction = createAction(
  '[Money Send Form component] Get Send Countries Success',
  props<{ sendCountries: Country[] }>()
);

export const getReceiveCountriesSuccessAction = createAction(
  '[Money Send Form component] Get Receive Countries Success',
  props<{ receiveCountries: Country[] }>()
);
