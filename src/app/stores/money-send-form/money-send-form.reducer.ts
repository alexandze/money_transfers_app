import { createReducer, on } from '@ngrx/store';
import {
  convertAmountAction,
  convertAmountSuccessAction,
  getRateSuccessAction,
  getReceiveCountriesAction,
  getReceiveCountriesSuccessAction,
  getSendCountriesAction,
  getSendCountriesSuccessAction,
  setSelectedReceiveCountryAction,
  setSelectedReceiveRateSuccessAction,
  setSelectedSendCountryAction,
  setSelectedSendRateSuccessAction,
} from './money-send-form.actions';
import { Rate } from '../../models/Rate';
import { Country } from '../../models/Country';
import { AmountType } from '../../models/AmountType';

export const MONEY_SEND_FORM_STATE_NAME = 'moneySendForm';

export interface MoneySendFormState {
  sendAmount?: number;
  receiveAmount?: number;
  rates?: Rate[];
  sendCountries?: Country[];
  receiveCountries?: Country[];
  sendCountriesDropdownLoading?: boolean;
  receiveCountriesDropdownLoading?: boolean;
  selectedSendCountry: Country | null;
  selectedReceiveCountry: Country | null;
  selectedSendRate?: Rate;
  selectedReceiveRate?: Rate;
}

export const initialState: MoneySendFormState = {
  selectedSendCountry: null,
  selectedReceiveCountry: null,
};

export const moneySendFormReducer = createReducer(
  initialState,
  on(convertAmountAction, (state, { amount, amountType }) =>
    amountType === AmountType.Send
      ? {
          ...state,
          sendAmount: amount,
        }
      : { ...state, receiveAmount: amount }
  ),
  on(
    convertAmountSuccessAction,
    (state, { amountConverted, amountTypeConverted }) =>
      amountTypeConverted === AmountType.Send
        ? { ...state, sendAmount: amountConverted }
        : {
            ...state,
            receiveAmount: amountConverted,
          }
  ),
  on(getRateSuccessAction, (state, { rates }) => ({
    ...state,
    rates,
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
  })),
  on(setSelectedSendRateSuccessAction, (state, { selectedSendRate }) => ({
    ...state,
    selectedSendRate,
  })),
  on(setSelectedReceiveRateSuccessAction, (state, { selectedReceiveRate }) => ({
    ...state,
    selectedReceiveRate,
  }))
);
