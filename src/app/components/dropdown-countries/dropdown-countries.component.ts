import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { DropdownFilterOptions, DropdownModule } from 'primeng/dropdown';
import { Country } from '../../models/Country';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown-countries',
  standalone: true,
  imports: [FormsModule, DropdownModule, CommonModule, ReactiveFormsModule],
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
  implements OnInit, ControlValueAccessor, AfterViewInit
{
  countries: Country[] | undefined;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() forLabel: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};
  value: any;

  get selectedCountry(): Country | null {
    return this.selectedCountryFormControl.value;
  }

  selectedCountryFormControl = new FormControl<Country | null>(null);

  filterValue: string | undefined = '';
  isDisabled: boolean = false;

  ngOnInit() {
    this.countries = [{ name: 'Canada', code: 'CA' }];
  }

  ngAfterViewInit(): void {
    this.selectedCountryFormControl.valueChanges.subscribe((value) => {
      this.onChange(value);
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

  writeValue(obj: any): void {
    this.selectedCountryFormControl.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
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
