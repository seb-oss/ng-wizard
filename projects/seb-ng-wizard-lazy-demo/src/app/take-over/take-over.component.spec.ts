import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeOverComponent } from './take-over.component';

describe('TakeOverComponent', () => {
  let component: TakeOverComponent;
  let fixture: ComponentFixture<TakeOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TakeOverComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
