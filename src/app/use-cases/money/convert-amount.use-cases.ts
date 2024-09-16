import { Observable } from 'rxjs';
import { AmountType } from '../../models/AmountType';

export interface ConvertAmountUseCase {
  convertAmount(
    amount: number | undefined,
    amountType: AmountType
  ): Observable<number | undefined>;
}
