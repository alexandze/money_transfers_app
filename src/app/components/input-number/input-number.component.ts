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
  @Input() label = '';
  @Input() placeholder = '';
  @Input() forLabel = '';
  @Input() inputId = '';
  @Input() mode = '';
  @Input() currency: string | null = '';
  @Input() _currency: string = DEFAULT_CURRENCY;

  destroyRef = inject(DestroyRef);

  onChange: FuncNumberVoid = () => {
    return;
  };
  onTouched: FuncNumberVoid = () => {
    return;
  };

  inputNumberFormControl = new FormControl<number | null>(null);

  isDisabled = false;
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
        tap((value) => this.onChange(value)),
      )
      .subscribe();

    this.setDisabledState?.(this.isDisabled);
  }

  writeValue(obj: number): void {
    this.inputNumberFormControl.setValue(obj, { emitEvent: false });
  }

  registerOnChange(fn: FuncNumberVoid): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: FuncNumberVoid): void {
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

type FuncNumberVoid = (value: number | null) => void;
