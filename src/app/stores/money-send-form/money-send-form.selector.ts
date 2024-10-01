import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MONEY_SEND_FORM_STATE_NAME,
  MoneySendFormState,
} from './money-send-form.reducer';
import * as _ from 'lodash';

const selectMoneySendForm = createFeatureSelector<MoneySendFormState>(
  MONEY_SEND_FORM_STATE_NAME,
);

export const selectSendCountries = createSelector(
  selectMoneySendForm,
  (state) => state.sendCountries,
);

export const selectReceiveCountries = createSelector(
  selectMoneySendForm,
  (state) => state.receiveCountries,
);

export const selectSendCountriesDropdownLoading = createSelector(
  selectMoneySendForm,
  (state) => state.sendCountriesDropdownLoading,
);

export const selectReceiveCountriesDropdownLoading = createSelector(
  selectMoneySendForm,
  (state) => state.receiveCountriesDropdownLoading,
);

export const selectSendCurrency = createSelector(
  selectMoneySendForm,
  (state) => state?.selectedSendCountry?.currency,
);

export const selectReceiveCurrency = createSelector(
  selectMoneySendForm,
  (state) => state?.selectedReceiveCountry?.currency,
);

export const selectSendAmountRateType = createSelector(
  selectMoneySendForm,
  (state) =>
    `${state.selectedSendCountry?.code}->${state.selectedReceiveCountry?.code}`,
);

export const selectReceiveAmountRateType = createSelector(
  selectMoneySendForm,
  (state) =>
    `${state.selectedReceiveCountry?.code}->${state.selectedSendCountry?.code}`,
);

export const selectRates = createSelector(
  selectMoneySendForm,
  (state) => state.rates,
);

export const selectRate = createSelector(selectMoneySendForm, (state) =>
  _.isNumber(state.selectedSendRate?.value) ? state.selectedSendRate?.value : 0,
);

export const selectSelectedSendRate = createSelector(
  selectMoneySendForm,
  (state) => state.selectedSendRate,
);

export const selectSelectedReceiveRate = createSelector(
  selectMoneySendForm,
  (state) => state.selectedReceiveRate,
);

export const selectSendAmount = createSelector(
  selectMoneySendForm,
  (state) => state.sendAmount,
);

export const selectReceiveAmount = createSelector(
  selectMoneySendForm,
  (state) => state.receiveAmount,
);

export const selectFee = createSelector(selectMoneySendForm, (state) =>
  _.isNumber(state.selectedSendRate?.fee) ? state.selectedSendRate?.fee : 0,
);

export const selectTotal = createSelector(
  selectMoneySendForm,
  (state) => state.total,
);
