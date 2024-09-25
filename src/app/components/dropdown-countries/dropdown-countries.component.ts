import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownFilterOptions, DropdownModule } from 'primeng/dropdown';
import { Country } from '../../models/Country';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dropdown-countries',
  standalone: true,
  imports: [DropdownModule, CommonModule, ReactiveFormsModule],
  templateUrl: './dropdown-countries.component.html',
  styleUrl: './dropdown-countries.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownCountriesComponent,
    },
  ],
})
export class DropdownCountriesComponent
  implements ControlValueAccessor, AfterViewInit
{
  @Input() countries: Country[] | undefined;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() forLabel = '';
  @Input() loading = false;

  destroyRef = inject(DestroyRef);

  onChange?: (value: Country | null) => Country | null;
  onTouched?: (value: Country | null) => Country | null;

  get selectedCountry(): Country | null {
    return this.selectedCountryFormControl.value;
  }

  selectedCountryFormControl = new FormControl<Country | null>(null);

  filterValue: string | undefined = '';
  isDisabled = false;
  cssProperties = { width: '100%' };

  ngAfterViewInit(): void {
    this.selectedCountryFormControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.onChange?.(value);
      });

    this.setDisabledState?.(this.isDisabled);
  }

  resetFunction(options: DropdownFilterOptions) {
    options.reset?.();
    this.filterValue = '';
  }

  customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions) {
    options.filter?.(event);
  }

  writeValue(obj: Country | null): void {
    this.selectedCountryFormControl.setValue(obj);
  }

  registerOnChange(fn: (value: Country | null) => Country | null): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (value: Country | null) => Country | null): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.selectedCountryFormControl.disable();
      return;
    }

    this.selectedCountryFormControl.enable();
  }
}
