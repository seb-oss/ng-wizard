import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAndRouteGuardComponent } from './form-and-route-guard.component';

describe('FormAndRouteGuardComponent', () => {
  let component: FormAndRouteGuardComponent;
  let fixture: ComponentFixture<FormAndRouteGuardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormAndRouteGuardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAndRouteGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
