import { createReducer, on } from '@ngrx/store';
import {
  convertSendValueToReceiveValueAction,
  getRateSuccessAction,
  getReceiveCountriesAction,
  getReceiveCountriesSuccessAction,
  getSendCountriesAction,
  getSendCountriesSuccessAction,
  setCountryCodeAction,
  setSelectedReceiveCountryAction,
  setSelectedSendCountryAction,
} from './money-send-form.actions';
import { Rate } from '../../models/Rate';
import { Country } from '../../models/Country';

export const MONEY_SEND_FORM_STATE_NAME = 'moneySendForm';

export interface MoneySendFormState {
  sendAmount?: number;
  receiveAmount?: number;
  rate?: Rate;
  sendCountries?: Country[];
  receiveCountries?: Country[];
  sendCountriesDropdownLoading?: boolean;
  receiveCountriesDropdownLoading?: boolean;
  selectedSendCountry: Country | null;
  selectedReceiveCountry: Country | null;
}

export const initialState: MoneySendFormState = {
  selectedSendCountry: null,
  selectedReceiveCountry: null,
};

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
  on(getSendCountriesAction, (state) => ({
    ...state,
    sendCountriesDropdownLoading: true,
  })),
  on(getReceiveCountriesAction, (state) => ({
    ...state,
    receiveCountriesDropdownLoading: true,
  })),
  on(getReceiveCountriesSuccessAction, (state, { receiveCountries }) => ({
    ...state,
    receiveCountries,
    receiveCountriesDropdownLoading: false,
  })),
  on(getSendCountriesSuccessAction, (state, { sendCountries }) => ({
    ...state,
    sendCountries,
    sendCountriesDropdownLoading: false,
  })),
  on(setSelectedSendCountryAction, (state, { selectedSendCountry }) => ({
    ...state,
    selectedSendCountry,
  })),
  on(setSelectedReceiveCountryAction, (state, { selectedReceiveCountry }) => ({
    ...state,
    selectedReceiveCountry,
  }))
);
