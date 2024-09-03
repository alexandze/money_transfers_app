import { Observable } from 'rxjs';
import { Rate } from '../../models/Rate';

export interface GetRateUseCase {
  getRate(): Observable<Rate>;
}
