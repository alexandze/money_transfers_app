import { Observable } from 'rxjs';
import { AmountType } from '../../models/AmountType';

export interface ConvertAmountUseCase {
  convertAmount(
    amount: number | undefined | null,
    amountType: AmountType,
  ): Observable<number | undefined>;

  reverseAmountType(amountType: AmountType): AmountType;
}
