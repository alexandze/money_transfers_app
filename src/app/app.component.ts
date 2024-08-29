import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownCountriesComponent } from './components/dropdown-countries/dropdown-countries.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DropdownCountriesComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'money_transfer';
  myFormControl = new FormControl<string>('');

  ngAfterViewInit(): void {
    this.myFormControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
