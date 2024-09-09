import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MONEY_SEND_FORM_STATE_NAME,
  MoneySendFormState,
} from './money-send-form.reducer';

const selectMoneySendForm = createFeatureSelector<MoneySendFormState>(
  MONEY_SEND_FORM_STATE_NAME
);

export const selectSendCountries = createSelector(
  selectMoneySendForm,
  (state) => state.sendCountries
);

export const selectReceiveCountries = createSelector(
  selectMoneySendForm,
  (state) => state.receiveCountries
);

export const selectSendCountriesDropdownLoading = createSelector(
  selectMoneySendForm,
  (state) => state.sendCountriesDropdownLoading
);

export const selectReceiveCountriesDropdownLoading = createSelector(
  selectMoneySendForm,
  (state) => state.receiveCountriesDropdownLoading
);

export const selectSendCurrency = createSelector(
  selectMoneySendForm,
  (state) => state?.selectedSendCountry?.currency
);

export const selectReceiveCurrency = createSelector(
  selectMoneySendForm,
  (state) => state?.selectedReceiveCountry?.currency
);
