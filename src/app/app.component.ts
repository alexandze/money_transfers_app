import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoneySendFormComponent } from './containers/money-send-form/money-send-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MoneySendFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'money_transfer';
}
