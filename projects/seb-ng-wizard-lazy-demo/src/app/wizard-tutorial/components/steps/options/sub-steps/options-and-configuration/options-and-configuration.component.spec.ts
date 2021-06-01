import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsAndConfigurationComponent } from './options-and-configuration.component';

describe('OptionsAndConfigurationComponent', () => {
  let component: OptionsAndConfigurationComponent;
  let fixture: ComponentFixture<OptionsAndConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsAndConfigurationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsAndConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
