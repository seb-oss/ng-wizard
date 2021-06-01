import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailsIndexComponent } from './account-details-index.component';

describe('AccountDetailsIndexComponent', () => {
  let component: AccountDetailsIndexComponent;
  let fixture: ComponentFixture<AccountDetailsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDetailsIndexComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
