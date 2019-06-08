import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyMedicalInfoComponent } from './emergency-medical-info.component';

describe('EmergencyMedicalInfoComponent', () => {
  let component: EmergencyMedicalInfoComponent;
  let fixture: ComponentFixture<EmergencyMedicalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyMedicalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyMedicalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
