import { Observable } from 'rxjs';
import { Country } from '../../models/Country';

export interface GetCountriesUseCase {
  getSendCountries(): Observable<Country[]>;
  getReceiveCountries(): Observable<Country[]>;
}
