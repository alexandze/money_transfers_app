import { Observable } from 'rxjs';

export interface CalculateTotalUseCase {
  calculateTotal(sendAmount: number): Observable<number>;
}
