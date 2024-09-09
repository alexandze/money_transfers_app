import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { DropdownCountriesComponent } from '../../components/dropdown-countries/dropdown-countries.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputNumberComponent } from '../../components/input-number/input-number.component';
import { Country } from '../../models/Country';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  getRateAction,
  getReceiveCountriesAction,
  getSendCountriesAction,
  setSelectedReceiveCountryAction,
  setSelectedSendCountryAction,
} from '../../stores/money-send-form/money-send-form.actions';
import { map, Observable, tap, zip } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  selectReceiveCountries,
  selectReceiveCurrency,
  selectSendCountries,
  selectSendCountriesDropdownLoading,
  selectSendCurrency,
} from '../../stores/money-send-form/money-send-form.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-money-send-form',
  standalone: true,
  imports: [
    DropdownCountriesComponent,
    ReactiveFormsModule,
    InputNumberComponent,
    CommonModule,
  ],
  templateUrl: './money-send-form.component.html',
  styleUrl: './money-send-form.component.scss',
})
export class MoneySendFormComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  sendCountriesFormControl = new FormControl<Country | null>(null);
  receiveCountriesFormControl = new FormControl<Country | null>(null);
  sendAmountFormControl = new FormControl<number | null>(null);
  receiveAmountFormControl = new FormControl<number | null>(null);

  readonly sendCountries = this.store.selectSignal(selectSendCountries);
  readonly receiveCountries = this.store.selectSignal(selectReceiveCountries);

  readonly sendCountriesDropdownLoading = this.store.selectSignal(
    selectSendCountriesDropdownLoading
  );

  readonly receiveCountriesDropdownLoading = this.store.selectSignal(
    selectSendCountriesDropdownLoading
  );

  // label
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
  sendCurrency$: Observable<string | null>;
  receiveCurrency$: Observable<string | null>;
  // for label
  forLabelSendAmount = 'sendAmount';
  forLabelReceiveAmount = 'receiveAmount';

  constructor(private store: Store<AppState>) {
    this.sendCurrency$ = this.createSendCurrencyObs();
    this.receiveCurrency$ = this.createReceiveCurrencyObs();
  }
  ngOnInit(): void {
    this.onInitDispatch();
  }

  ngAfterViewInit(): void {
    this.onDispatchSelectedSendCountry();
    this.onDispatchSelectedReceiveCountry();
  }

  private onInitDispatch() {
    this.store.dispatch(getRateAction());
    this.store.dispatch(getSendCountriesAction());
    this.store.dispatch(getReceiveCountriesAction());
  }

  private onDispatchSelectedSendCountry() {
    this.disabledSendAmountFormControl();

    this.sendCountriesFormControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((selectedSendCountry) =>
          this.store.dispatch(
            setSelectedSendCountryAction({ selectedSendCountry })
          )
        )
      )
      .subscribe();
  }

  private onDispatchSelectedReceiveCountry() {
    this.disabledReceiveAmountFormControl();

    this.receiveCountriesFormControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((selectedReceiveCountry) =>
          this.store.dispatch(
            setSelectedReceiveCountryAction({ selectedReceiveCountry })
          )
        )
      )
      .subscribe();
  }

  private createSendCurrencyObs() {
    return this.store.select(selectSendCurrency).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((sendCurrency) =>
        !!sendCurrency
          ? this.enableSendAmountFormControl()
          : this.disabledSendAmountFormControl()
      ),
      map((sendCurrency) => (!!sendCurrency ? sendCurrency : null))
    );
  }

  private createReceiveCurrencyObs() {
    return this.store.select(selectReceiveCurrency).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((receiveCurrency) =>
        !!receiveCurrency
          ? this.enableReceiveAmountFormControl()
          : this.disabledReceiveAmountFormControl()
      ),
      map((receiveCurrency) => (!!receiveCurrency ? receiveCurrency : null))
    );
  }

  private disabledSendAmountFormControl() {
    this.sendAmountFormControl.disable();
  }

  private disabledReceiveAmountFormControl() {
    this.receiveAmountFormControl.disable();
  }

  private enableSendAmountFormControl() {
    this.sendAmountFormControl.enable();
  }

  private enableReceiveAmountFormControl() {
    this.receiveAmountFormControl.enable();
  }

  private convertCADToXAF(cadAmount: number): number | null {
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
}
