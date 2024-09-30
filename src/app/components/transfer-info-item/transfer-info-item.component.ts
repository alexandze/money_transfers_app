import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-transfer-info-item',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './transfer-info.component.html',
  styleUrl: './transfer-info.component.scss',
})
export class TransferInfoItemComponent implements OnInit {
  @Input() title = '';
  @Input() value?: string;
  @Input() valueIconClass?: string;
  @Input() titleIconClass?: string;
  @Input() tooltipText?: string;
  tooltipOptions?: { disabled: boolean };
  // dot p-badge-dot bg-green-500 mr-1
  // The send rate indicates the exchange rate you will receive when sending.

  get hasValueIconClass(): boolean {
    return !!this.valueIconClass;
  }

  get hasTitleIconClass(): boolean {
    return !!this.titleIconClass;
  }

  ngOnInit(): void {
    this.initTooltipOptions();
  }

  private initTooltipOptions(): void {
    this.tooltipOptions = {
      disabled: !this.tooltipText,
    };
  }
}
