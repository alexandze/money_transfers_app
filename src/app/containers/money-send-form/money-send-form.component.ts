import { Component, DestroyRef, inject, OnInit, Signal } from '@angular/core';
import { DropdownCountriesComponent } from '../../components/dropdown-countries/dropdown-countries.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputNumberComponent } from '../../components/input-number/input-number.component';
import { Country } from '../../models/Country';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import {
  convertAmountAction,
  getRateAction,
  getReceiveCountriesAction,
  getSendCountriesAction,
  setSelectedReceiveCountryAction,
  setSelectedReceiveRateAction,
  setSelectedSendCountryAction,
  setSelectedSendRateAction,
} from '../../stores/money-send-form/money-send-form.actions';
import { map, Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  selectFee,
  selectRate,
  selectReceiveAmount,
  selectReceiveCountries,
  selectReceiveCurrency,
  selectSendAmount,
  selectSendCountries,
  selectSendCountriesDropdownLoading,
  selectSendCurrency,
} from '../../stores/money-send-form/money-send-form.selector';
import { CommonModule } from '@angular/common';
import { AmountType } from '../../models/AmountType';
import { TransferInfoItemComponent } from '../../components/transfer-info-item/transfer-info-item.component';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-money-send-form',
  standalone: true,
  imports: [
    DropdownCountriesComponent,
    ReactiveFormsModule,
    InputNumberComponent,
    CommonModule,
    TransferInfoItemComponent,
    DividerModule,
    ButtonModule,
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
    selectSendCountriesDropdownLoading,
  );

  readonly receiveCountriesDropdownLoading = this.store.selectSignal(
    selectSendCountriesDropdownLoading,
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
  sendCurrency$?: Observable<string | null>;
  receiveCurrency$?: Observable<string | null>;
  // for label
  forLabelSendAmount = 'sendAmount';
  forLabelReceiveAmount = 'receiveAmount';
  rate?: Signal<number | undefined>;
  fee?: Signal<number | undefined>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.onInitDispatch();
    this.onInitObs();
  }

  private onInitDispatch() {
    this.store.dispatch(getRateAction());
    this.store.dispatch(getSendCountriesAction());
    this.store.dispatch(getReceiveCountriesAction());
  }

  private onInitObs() {
    this.sendCurrency$ = this.createSendCurrencyObs();
    this.receiveCurrency$ = this.createReceiveCurrencyObs();
    this.initRateSignal();
    this.onDispatchSelectedSendCountry();
    this.onDispatchSelectedReceiveCountry();
    this.onDispatchSendAmountValueChange();
    this.onDispatchReceiveAmountValueChange();
    this.onSendAmountChange();
    this.onReceiveAmountChange();
    this.initFeeSignal();
  }

  private onDispatchSendAmountValueChange() {
    this.sendAmountFormControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((amount) =>
          this.store.dispatch(
            convertAmountAction({
              amount,
              amountType: AmountType.Send,
            }),
          ),
        ),
      )
      .subscribe();
  }

  private onDispatchReceiveAmountValueChange() {
    this.receiveAmountFormControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((amount) =>
          this.store.dispatch(
            convertAmountAction({
              amount,
              amountType: AmountType.Receive,
            }),
          ),
        ),
      )
      .subscribe();
  }

  private onDispatchSelectedSendCountry() {
    this.disabledSendAmountFormControl();

    this.sendCountriesFormControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((selectedSendCountry) =>
          this.store.dispatch(
            setSelectedSendCountryAction({ selectedSendCountry }),
          ),
        ),
        tap(() => {
          this.store.dispatch(setSelectedSendRateAction());
          this.store.dispatch(setSelectedReceiveRateAction());
        }),
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
            setSelectedReceiveCountryAction({ selectedReceiveCountry }),
          ),
        ),
        tap(() => {
          this.store.dispatch(setSelectedSendRateAction());
          this.store.dispatch(setSelectedReceiveRateAction());
        }),
      )
      .subscribe();
  }

  private createSendCurrencyObs() {
    return this.store.select(selectSendCurrency).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((sendCurrency) =>
        sendCurrency
          ? this.enableSendAmountFormControl()
          : this.disabledSendAmountFormControl(),
      ),
      map((sendCurrency) => (sendCurrency ? sendCurrency : null)),
    );
  }

  private createReceiveCurrencyObs() {
    return this.store.select(selectReceiveCurrency).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((receiveCurrency) =>
        receiveCurrency
          ? this.enableReceiveAmountFormControl()
          : this.disabledReceiveAmountFormControl(),
      ),
      map((receiveCurrency) => (receiveCurrency ? receiveCurrency : null)),
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

  private onReceiveAmountChange() {
    this.store
      .select(selectReceiveAmount)
      .pipe(
        tap((amount) => {
          this.receiveAmountFormControl.setValue(amount as number, {
            emitEvent: false,
          });
        }),
      )
      .subscribe();
  }

  private onSendAmountChange() {
    this.store
      .select(selectSendAmount)
      .pipe(
        tap((amount) => {
          this.sendAmountFormControl.setValue(amount as number, {
            emitEvent: false,
          });
        }),
      )
      .subscribe();
  }

  private initRateSignal() {
    this.rate = this.store.selectSignal(selectRate);
  }

  private initFeeSignal() {
    this.fee = this.store.selectSignal(selectFee);
  }
}
