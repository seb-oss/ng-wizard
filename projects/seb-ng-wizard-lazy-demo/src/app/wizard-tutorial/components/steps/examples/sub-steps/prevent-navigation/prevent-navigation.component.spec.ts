import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventNavigationComponent } from './prevent-navigation.component';

describe('PreventNavigationComponent', () => {
  let component: PreventNavigationComponent;
  let fixture: ComponentFixture<PreventNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreventNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
