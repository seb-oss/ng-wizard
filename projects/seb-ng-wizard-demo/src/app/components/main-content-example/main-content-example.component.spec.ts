import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContentExampleComponent } from './main-content-example.component';

describe('MainContentExampleComponent', () => {
  let component: MainContentExampleComponent;
  let fixture: ComponentFixture<MainContentExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainContentExampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContentExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
