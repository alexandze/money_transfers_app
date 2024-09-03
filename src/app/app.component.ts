import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DropdownCountriesComponent } from './components/dropdown-countries/dropdown-countries.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, tap, zip } from 'rxjs';
import { Country } from './models/Country';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import {
  getRateAction,
  getReceiveCountriesAction,
  getSendCountriesAction,
} from './stores/money-send-form/money-send-form.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DropdownCountriesComponent,
    ReactiveFormsModule,
    InputNumberComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'money_transfer';
  countriesFromFormControl = new FormControl<Country | null>(null);
  countriesToFormControl = new FormControl<Country | null>(null);
  sendAmountFormControl = new FormControl<number | null>(null);
  receiveAmountFormControl = new FormControl<number | null>(null);
  destroyRef = inject(DestroyRef);

  countriesFrom: Country[] = [{ name: 'Canada', code: 'CA', currency: 'CAD' }];
  countriesTo: Country[] = [{ name: 'Cameroon', code: 'CMR', currency: 'XAF' }];

  // label:
  labelCountryFrom = 'Country from';
  labelCountryTo = 'Country to';
  labelSendAmount = 'Send amount';
  labelReceiveAmount = 'Receive amount';
  // placeholder
  placeholderCountryFrom = 'Select a country from';
  placeholderCountryTo = 'Select a country to';
  placeholderSendAmount = 'Enter a send amount';
  placeholderReceiveAmount = 'Enter a receive amount';
  // mode
  modeAmountInputNumber = 'currency';
  //currency
  currencySendAmount = 'USD';
  currencyReceiveAmount = 'USD';
  // for label
  forLabelSendAmount = 'sendAmount';
  forLabelReceiveAmount = 'receiveAmount';

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.onInitDispatch();
  }

  ngAfterViewInit(): void {
    this.onConvertSendValueToReceiveValue();
    this.onConvertReceiveValueToSendValue();
    this.onChooseSendCurrency();
  }

  private onInitDispatch() {
    this.store.dispatch(getRateAction());
    this.store.dispatch(getSendCountriesAction());
    this.store.dispatch(getReceiveCountriesAction());
  }

  private onChooseSendCurrency() {
    this.disabledAmountForm();

    zip(
      this.countriesFromFormControl.valueChanges,
      this.countriesToFormControl.valueChanges
    )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(([sendAmountCountry, receiveAmountCountry]) =>
          this.chooseCurrencyForSendReceiveAmount(
            sendAmountCountry,
            receiveAmountCountry
          )
        ),
        tap(() => this.enabledAmountForm())
      )
      .subscribe();
  }

  private chooseCurrencyForSendReceiveAmount(
    countrySendAmount: Country | null,
    countryReceiveAmount: Country | null
  ): void {
    if (!countrySendAmount || !countryReceiveAmount) {
      return;
    }

    this.currencySendAmount = this.chooseCurrency(countrySendAmount);
    this.currencyReceiveAmount = this.chooseCurrency(countryReceiveAmount);
  }

  private chooseCurrency(country: Country | null): string {
    if (!country) {
      return '';
    }

    const code = country.code;

    switch (code) {
      case 'CA':
        return 'CAD';
      case 'CMR':
        return 'XAF';
      default:
        return '';
    }
  }

  private disabledAmountForm() {
    this.sendAmountFormControl.disable();
    this.receiveAmountFormControl.disable();
  }

  private enabledAmountForm() {
    this.sendAmountFormControl.enable();
    this.receiveAmountFormControl.enable();
  }

  private convertCADToXAF(cadAmount: number | null): number | null {
    if (typeof cadAmount !== 'number') {
      return null;
    }

    // TODO: rate from API
    return cadAmount * 440;
  }

  private convertXAFToCAD(xafAmount: number | null): number | null {
    if (typeof xafAmount !== 'number') {
      return null;
    }

    // TODO: rate from API
    return xafAmount / 440;
  }

  private onConvertSendValueToReceiveValue() {
    this.sendAmountFormControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((value) => this.convertCADToXAF(value)),
        tap((value) =>
          this.receiveAmountFormControl.setValue(value, {
            emitEvent: false,
          })
        )
      )
      .subscribe();
  }

  private onConvertReceiveValueToSendValue() {
    this.receiveAmountFormControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((value) => this.convertXAFToCAD(value)),
        tap((value) =>
          this.sendAmountFormControl.setValue(value, { emitEvent: false })
        )
      )
      .subscribe();
  }
}
