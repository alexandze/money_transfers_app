import { MoneySendFormState } from './stores/money-send-form/money-send-form.reducer';

export const MONEY_SEND_FORM_STATE_NAME = 'moneySendForm';

export interface AppState {
  [MONEY_SEND_FORM_STATE_NAME]: MoneySendFormState;
}
