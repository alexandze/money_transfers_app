import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
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
  implements ControlValueAccessor, AfterViewInit
{
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() forLabel: string = '';
  @Input() inputId: string = '';
  @Input() mode: string = '';
  @Input() currency: string = '';

  destroyRef = inject(DestroyRef);

  onChange: any = () => {};
  onTouched: any = () => {};

  inputNumberFormControl = new FormControl<number | null>(null);

  isDisabled: boolean = false;
  cssProperties = { width: '100%' };

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
    console.log(isDisabled);
    if (isDisabled) {
      this.inputNumberFormControl.disable();
      return;
    }

    this.inputNumberFormControl.enable();
  }
}
