import { Component } from '@angular/core';

@Component({
  selector: 'app-protected-step',
  templateUrl: './protected-step.component.html',
})
export class ProtectedStepComponent {
  constructor() {}
  // expose route outlet template
  routerOutlet = `<!-- add wizard component and router outlet -->
<wiz-wizard
  title="SEB ng-wizard: Protecting steps"
  (close)="onClose()">
  <!-- wizard-actions can be used to add controls to header -->
  <div class="wizard-actions">
    <button class="btn btn-secondary d-flex justify-content-between" (click)="save()">
      Save <fa-icon icon="save" class="ml-2"></fa-icon>
    </button>
  </div>
  <div class="wizard-main col-12 col-lg order-1 order-md-0 mr-lg-3">
    <router-outlet></router-outlet>
  </div>
</wiz-wizard>

`;

  // expose route outlet
  routerOutletTs = `import { Component } from '@angular/core';
import { WizardControlService } from '@sebgroup/ng-wizard';

@Component({
  selector: 'app-form-and-route-guard',
  templateUrl: './form-and-route-guard.component.html',
  styleUrls: ['./form-and-route-guard.component.scss']
})
export class FormAndRouteGuardComponent {

  constructor(private controls: WizardControlService) {}

  /**
   * Global close function - function is available on all steps
   */
  onClose(event?: MouseEvent) {
    console.log('Close function called');
  }

  /**
   * Global save function - function is available on all steps
   */
  save($event: MouseEvent) {
    console.log('Save function called');

    // optionally the wizard control service can be used to emit an control event
    this.controls.click($event, { type: 'save', name: 'Save' });
  }
}

`;

  // expose template
  template = `<p>
  Basic concept involves using a route guard with
  <a href="https://angular.io/api/router/CanActivate" target="_blank" class="external">CanActivate</a> to prevent
  navigation to a specif route. In this example we're going to use a simple service to store the form data which in turn
  will be used by the route guard to determine if navigation is allowed or not. We're also going to implement form
  validation to make sure the information we enter is valid before storing it in our service.
</p>
<p>
  There are many ways to set up a form in angular, this example uses
  <a href="https://angular.io/api/forms/FormBuilder" target="_blank" class="external">Form Builder</a> and
  <a href="https://angular.io/guide/reactive-forms" target="_blank" class="external">Reactive Forms</a> which provides a
  model-driven approach for forms. Feel free to use whatever you like and what suits your needs, the complete code with
  comments for this example can be found <a href="" class="external" target="_parent">here</a>.
</p>
<ng-container *ngIf="{ isOk: ($stepStatus | async)?.state } as stepStatus">
  <div class="alert alert-danger alert-icon mx-n3 mx-sm-0" *ngIf="!stepStatus.isOk && submitted" tabindex="-1">
    <ng-container *ngIf="profileForm.invalid || profileForm.pending"
    >The form contains error, you need to correct them before proceeding.</ng-container
    >
    <ng-container *ngIf="profileForm.valid"
    >You need to save the information before continuing to the next step.</ng-container
    >
  </div>
  <div class="alert alert-success alert-icon mx-n3 mx-sm-0" *ngIf="stepStatus.isOk && submitted && profileForm.valid">
    <ng-container *ngIf="profileForm.valid">You're profile was successfully saved!</ng-container>
  </div>
</ng-container>
<form [formGroup]="profileForm" (ngSubmit)="save()">
  <div class="form-row">
    <div class="form-group col-sm-6 col-xl-4">
      <label for="inputFirstName">First name</label>
      <input
        type="email"
        class="form-control"
        [ngClass]="{
          'is-invalid': firstName.invalid && firstName.touched && submitted,
          'is-valid': firstName.valid && submitted
        }"
        id="inputFirstName"
        placeholder="First name"
        formControlName="firstName"
        required
      />
      <div
        [ngClass]="{ 'invalid-feedback': firstName.invalid, 'valid-feedback': firstName.valid }"
        *ngIf="(firstName.dirty || firstName.touched) && submitted"
      >
        <ng-container *ngIf="firstName.errors?.required"
          ><fa-icon icon="exclamation-triangle" class="mr-1"></fa-icon>This field can't be empty</ng-container
        >
        <ng-container *ngIf="firstName.valid"
          ><fa-icon icon="check-circle" class="mr-1"></fa-icon>Field is valid</ng-container
        >
      </div>
    </div>
    <div class="form-group col-sm-6 col-xl-4">
      <label for="inputLastName">Last name</label>
      <input
        type="email"
        class="form-control"
        [ngClass]="{
          'is-invalid': lastName.invalid && lastName.touched && submitted,
          'is-valid': lastName.valid && submitted
        }"
        id="inputLastName"
        placeholder="Last name"
        formControlName="lastName"
        required
      />
      <div
        [ngClass]="{ 'invalid-feedback': lastName.invalid, 'valid-feedback': lastName.valid }"
        *ngIf="(lastName.dirty || lastName.touched) && submitted"
      >
        <ng-container *ngIf="lastName.errors?.required"
          ><fa-icon icon="exclamation-triangle" class="mr-1"></fa-icon>This field can't be empty</ng-container
        >
        <ng-container *ngIf="lastName.valid"
          ><fa-icon icon="check-circle" class="mr-1"></fa-icon>Field is valid</ng-container
        >
      </div>
    </div>
    <div class="form-group col-md col-xl-8">
      <label for="inputEmail">Email</label>
      <input
        type="email"
        class="form-control"
        [ngClass]="{ 'is-invalid': email.invalid && email.touched && submitted, 'is-valid': email.valid && submitted }"
        id="inputEmail"
        placeholder="Email"
        formControlName="email"
        required
        email
      />
      <div
        [ngClass]="{
          'invalid-feedback': email.invalid,
          'valid-feedback': email.valid,
          'progress-feedback progress-50': email.pending
        }"
        *ngIf="(email.dirty || email.touched) && submitted"
      >
        <ng-container *ngIf="email.errors?.required"
          ><fa-icon icon="exclamation-triangle" class="mr-1"></fa-icon>This field can't be empty</ng-container
        >
        <ng-container *ngIf="email.errors?.email"
          ><fa-icon icon="exclamation-triangle" class="mr-1"></fa-icon>Email address is invalid</ng-container
        >
        <ng-container *ngIf="email.errors?.emailIsTaken"
          ><fa-icon icon="exclamation-triangle" class="mr-1"></fa-icon>This email has already been
          registered</ng-container
        >
        <ng-container *ngIf="email.valid"
          ><fa-icon icon="check-circle" class="mr-1"></fa-icon>Field is valid</ng-container
        >
        <ng-container *ngIf="email.pending"
          ><div class="spinner spinner-xs mr-1 d-inline-block" style="vertical-align: -3px; z-index: 0;"></div>
          Validating email</ng-container
        >
      </div>
      <div class="progress-feedback" *ngIf="(!email.touched && !email.pending && !email.valid) || !submitted">
        Enter any email except "john.doe@seb.se"
      </div>
    </div>
    <div class="form-group col-xl-8">
      <label for="inputAddress">Address</label>
      <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" formControlName="street" />
    </div>
    <div class="form-group col-xl-8">
      <label for="inputAddress2">Address 2</label>
      <input
        type="text"
        class="form-control"
        id="inputAddress2"
        placeholder="Apartment, studio, or floor"
        formControlName="extra"
      />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-auto">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" id="inputZip" style="width:100px;" formControlName="zip" />
    </div>
    <div class="form-group col col-sm-6 col-xl-4">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" id="inputCity" formControlName="city" />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col col-sm-auto">
      <div
        [ngClass]="{
          'border-danger': accept.invalid && submitted,
          'border-success': accept.valid && submitted,
          'border rounded p-3': submitted
        }"
      >
        <div class="custom-control custom-checkbox">
          <input
            class="custom-control-input"
            type="checkbox"
            [ngClass]="{ 'is-invalid': accept.invalid && submitted, 'is-valid': accept.valid && submitted }"
            id="gridCheck"
            formControlName="accept"
            required
          />
          <label class="custom-control-label" for="gridCheck">
            Accept terms
          </label>
        </div>
      </div>
      <ng-container *ngIf="submitted">
        <div class="small text-danger mt-1 mb-n1" *ngIf="accept.invalid">
          <fa-icon icon="exclamation-triangle" class="mr-1"></fa-icon>You need to accept the terms
        </div>
        <div class="small text-success mt-1 mb-n1" *ngIf="accept.valid">
          <fa-icon icon="check-circle" class="mr-1"></fa-icon>Terms accepted
        </div>
      </ng-container>
    </div>
  </div>
</form>`;

  // expose component
  component = `import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { WizardControlService } from '@sebgroup/ng-wizard';
import { StepService, StepState } from '../services/step.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
})
export class ReactiveFormComponent implements OnInit, OnDestroy {
  $stepStatus: Observable<StepState>; // observable for step status
  unsubscribe$ = new Subject();
  profileForm: FormGroup;
  submitted = false;

  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get accept() {
    return this.profileForm.get('accept');
  }

  get help() {
    return this.profileForm.get('help');
  }

  constructor(
    public stepService: StepService,
    private fb: FormBuilder,
    public controls: WizardControlService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef
  ) {
    this.profileForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], this.checkValidEmail],
      street: [''],
      extra: [''],
      city: [''],
      zip: [''],
      accept: ['', Validators.requiredTrue],
      help: [true],
    });

    this.$stepStatus = this.stepService.getState('/form-and-route-guard/form-step').pipe(
      filter(res => res && res.data),
      tap(res => this.profileForm.setValue(res.data)),
      tap(_ => this.cdr.detectChanges()),
    );
  }

  /**
   * Save form data if form is valid
   */
  save() {
    if (this.profileForm.valid) {
      this.stepService.saveState('/form-and-route-guard/form-step', this.profileForm.valid, this.profileForm.value);
    }
  }

  /**
   * Focus first invalid form control or alert message if it exists
   */
  private _focusInvalid() {
    if (this.profileForm.invalid) {
      const invalid: string = Object.keys(this.profileForm.controls)
        .find(key => this.profileForm.controls[key].invalid);

      if (invalid) {
        this.el.nativeElement.querySelector('[formcontrolname="' + invalid + '"]').focus();
      }
    } else {
      const alertMessage = this.el.nativeElement.querySelector('.alert.alert-danger');
      if (alertMessage) {
        alertMessage.focus();
      }
    }
  }

  /**
   * Check if email is valid
   * @param control - control to be validated
   */
  checkValidEmail(control: AbstractControl): ValidationErrors | null {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'john.doe@seb.se') {
          resolve({ emailIsTaken: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
  }

  ngOnInit() {
    // subscribe to control events
    this.controls.controlEvent$.pipe(takeUntil(this.unsubscribe$)).subscribe(control => {
      switch (control.type) {
        case 'next':
          this.submitted = true;
          this.profileForm.markAllAsTouched();
          this._focusInvalid();
          break;
        case 'save':
          this.submitted = true;
          this.profileForm.markAllAsTouched();
          this.save();
          this._focusInvalid();
          break;
        case 'cancel':
          this.profileForm.reset();
          this.stepService.saveState('/form-and-route-guard/form-step', this.profileForm.valid, this.profileForm.value);
          this.submitted = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}`;

  // expose route config
  routeConfig = `// setup routes and wizard steps in route module
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WizardSteps } from '@sebgroup/ng-wizard';
import { StepGuard } from './guards/step.guard';
import { ProtectedStepInfoComponent } from './components/secondary-content/protected-step-info/protected-step-info.component';
import { ProtectedStepComponent } from './components/steps/protected-step/protected-step.component';
import { ReactiveFormComponent } from './components/steps/reactive-form/reactive-form.component';
import { FormAndRouteGuardComponent } from './form-and-route-guard.component';

const routes: WizardSteps = [
  {
    path: '',
    component: FormAndRouteGuardComponent,
    children: [
      { path: '', redirectTo: 'form-step' },
      { path: 'form-step', component: ReactiveFormComponent,
        data: {
          heading: 'Protecting steps',
          controls: [{
            name: 'Save form',
            type: 'save'
          }, {
            name: 'Reset form',
            class: 'btn-outline-danger',
            type: 'cancel'
          }, {
            name: 'Next',
            path: 'protected-step',
            type: 'next'
          }],
          secondaryContent: {
            component: ProtectedStepInfoComponent
          }
        }
      },
      { path: 'protected-step', component: ProtectedStepComponent,
        data: {
          heading: 'Protected step',
          controls: [{
            name: 'Go back',
            path: 'form-step',
            type: 'prev'
          }]
        }, canActivate: [StepGuard]
      },
      { path: '**', redirectTo: 'form-step', pathMatch: 'full' }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAndRouteGuardRoutingModule {}
`;
}
