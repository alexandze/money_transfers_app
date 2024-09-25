import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCountriesComponent } from './dropdown-countries.component';

describe('DropdownCountriesComponent', () => {
  let component: DropdownCountriesComponent;
  let fixture: ComponentFixture<DropdownCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownCountriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
