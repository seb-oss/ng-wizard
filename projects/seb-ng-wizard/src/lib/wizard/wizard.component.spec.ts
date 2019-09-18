import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LeftNavigationComponent } from '../left-navigation/left-navigation.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { WizardStep } from './wizard-step';
import { WizardComponent } from './wizard.component';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'first', component: WizardComponent },
          { path: 'second', component: WizardComponent },
          { path: 'third', component: WizardComponent },
        ]),
      ],
      declarations: [WizardComponent, TopBarComponent, LeftNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('no steps should result in empty text and path', () => {
    let result;
    component.activeStep$.subscribe(step => (result = step));
    expect(result.text).toEqual('');
    expect(result.path).toEqual('');
  });
  it('no navigation should default to first step', () => {
    component.steps = [
      { path: '/first', text: 'First step' },
      { path: '/second', text: 'Second step' },
      { path: '/third', text: 'third step' },
    ];
    let result;
    component.activeStep$.subscribe(step => (result = step));
    expect(result.text).toEqual('First step');
    expect(result.path).toEqual('/first');
  });
  it('navigation should trigger step change', async () => {
    component.steps = [
      { path: '/first', text: 'First step' },
      { path: '/second', text: 'Second step' },
      { path: '/third', text: 'third step' },
    ];
    let result;
    component.activeStep$.subscribe(step => (result = step));
    await fixture.ngZone.run(() => router.navigate(['/third']));

    expect(result.text).toEqual('third step');
    expect(result.path).toEqual('/third');
  });
});
