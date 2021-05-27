import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalContentComponent } from './additional-content.component';

describe('AdditionalContentComponent', () => {
  let component: AdditionalContentComponent;
  let fixture: ComponentFixture<AdditionalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
