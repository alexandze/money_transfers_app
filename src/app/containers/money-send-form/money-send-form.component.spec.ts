import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneySendFormComponent } from './money-send-form.component';

describe('MoneySendFormComponent', () => {
  let component: MoneySendFormComponent;
  let fixture: ComponentFixture<MoneySendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneySendFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneySendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
