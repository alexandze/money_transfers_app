import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { tap } from 'rxjs';
import { DEFAULT_CURRENCY } from '../../models/Country';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [InputNumberModule, ReactiveFormsModule],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputNumberComponent,
    },
  ],
})
export class InputNumberComponent
  implements ControlValueAccessor, AfterViewInit, OnChanges
{
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() forLabel: string = '';
  @Input() inputId: string = '';
  @Input() mode: string = '';
  @Input() currency: string | null = '';
  @Input() _currency: string = DEFAULT_CURRENCY;

  destroyRef = inject(DestroyRef);

  onChange: any = () => {};
  onTouched: any = () => {};

  inputNumberFormControl = new FormControl<number | null>(null);

  isDisabled: boolean = false;
  cssProperties = { width: '100%' };

  ngOnChanges(changes: SimpleChanges): void {
    this.handleChangeCurrency(changes);
  }

  handleChangeCurrency(changes: SimpleChanges) {
    if (!changes['currency']) return;
    const currency: string = changes['currency'].currentValue;
    if (!currency) return;
    this._currency = currency;
  }

  ngAfterViewInit(): void {
    this.inputNumberFormControl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((value) => this.onChange(value))
      )
      .subscribe();

    this.setDisabledState?.(this.isDisabled);
  }

  writeValue(obj: any): void {
    this.inputNumberFormControl.setValue(obj, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputNumberFormControl.disable();
      return;
    }

    this.inputNumberFormControl.enable();
  }
}
