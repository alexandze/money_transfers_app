import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferInfoItemComponent } from './transfer-info-item.component';

describe('TransferInfoComponent', () => {
  let component: TransferInfoItemComponent;
  let fixture: ComponentFixture<TransferInfoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferInfoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferInfoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
