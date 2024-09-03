import { createReducer, on } from '@ngrx/store';
import {
  convertSendValueToReceiveValueAction,
  getRateSuccessAction,
  getReceiveCountriesSuccessAction,
  getSendCountriesSuccessAction,
  setCountryCodeAction,
} from './money-send-form.actions';
import { Rate } from '../../models/Rate';
import { Country } from '../../models/Country';

export interface MoneySendFormState {
  sendAmount?: number;
  receiveAmount?: number;
  rate?: Rate;
  sendCountries?: Country[];
  receiveCountries?: Country[];
}

export const initialState: MoneySendFormState = {};

export const moneySendFormReducer = createReducer(
  initialState,
  on(convertSendValueToReceiveValueAction, (state, { sendAmount }) => ({
    ...state,
    sendAmount: sendAmount,
  })),
  on(getRateSuccessAction, (state, { rate }) => ({
    ...state,
    rate: rate,
  })),
  on(getReceiveCountriesSuccessAction, (state, { receiveCountries }) => ({
    ...state,
    receiveCountries,
  })),
  on(getSendCountriesSuccessAction, (state, { sendCountries }) => ({
    ...state,
    sendCountries,
  }))
);
