import {
  MONEY_SEND_FORM_STATE_NAME,
  MoneySendFormState,
} from './stores/money-send-form/money-send-form.reducer';

export interface AppState {
  [MONEY_SEND_FORM_STATE_NAME]: MoneySendFormState;
}
