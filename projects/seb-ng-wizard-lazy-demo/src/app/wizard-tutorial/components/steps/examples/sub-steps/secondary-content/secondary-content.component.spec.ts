import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryContentComponent } from './secondary-content.component';

describe('SecondaryContentComponent', () => {
  let component: SecondaryContentComponent;
  let fixture: ComponentFixture<SecondaryContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
