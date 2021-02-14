import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuakerLogoComponent } from './quaker-logo.component';

describe('QuakerLogoComponent', () => {
  let component: QuakerLogoComponent;
  let fixture: ComponentFixture<QuakerLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuakerLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuakerLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
