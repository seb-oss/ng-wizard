import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { WizardControlService, WizardSteps } from '@sebgroup/ng-wizard';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil, tap } from 'rxjs/operators';
import { StepService } from '../../../../services/step.service';

@Component({
  selector: 'app-account-details-index',
  templateUrl: './account-details-index.component.html',
  styles: [],
})
export class AccountDetailsIndexComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject();
  accountDetailsForm: UntypedFormGroup;
  submitted = false;

  accountTypes: Array<{ name: string }> = [
    { name: 'Investeringssparkkonto (ISK)' },
    { name: 'Kaptialförsäkring (KF)' },
    { name: 'Värdepappersdepå' },
  ];

  get firstName() {
    return this.accountDetailsForm.get('firstName');
  }
  get lastName() {
    return this.accountDetailsForm.get('lastName');
  }

  get email() {
    return this.accountDetailsForm.get('email');
  }

  get accept() {
    return this.accountDetailsForm.get('accept');
  }

  get accountType() {
    return this.accountDetailsForm.get('accountType');
  }

  constructor(
    public stepService: StepService,
    private fb: UntypedFormBuilder,
    public controls: WizardControlService,
    private el: ElementRef,
    private wizardSteps: WizardSteps,
  ) {
    this.accountDetailsForm = fb.group({
      accountType: fb.control(null, [Validators.required]),
    });
  }
  stepStatus$ = this.stepService.getState().pipe(
    filter(res => res && res.data),
    distinctUntilChanged(),
    tap(res => this.accountDetailsForm.setValue(res.data)),
  );

  /**
   * Save form data if form is valid
   */
  save() {
    this.stepService.saveState(this.accountDetailsForm.valid ? 'success' : 'danger', this.accountDetailsForm.value);
    this.wizardSteps.updateSubSteps(
      this.accountDetailsForm.value.accountType === 'Investeringssparkkonto (ISK)' ? ['kyc'] : [],
    );
  }

  /**
   * Focus first invalid form control or alert message if it exists
   */
  private _focusInvalid() {
    if (this.accountDetailsForm.invalid) {
      const invalid: string = Object.keys(this.accountDetailsForm.controls).find(
        key => this.accountDetailsForm.controls[key].invalid,
      );

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

  ngOnInit() {
    this.accountDetailsForm.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(_ => this.save());

    // subscribe to control events
    this.controls.controlEvent$.pipe(takeUntil(this.unsubscribe$)).subscribe(control => {
      switch (control.type) {
        case 'next':
          this.submitted = true;
          this.accountDetailsForm.markAllAsTouched();
          this._focusInvalid();
          this.save();
          break;
        case 'cancel':
          this.accountDetailsForm.reset();
          this.stepService.saveState(null, this.accountDetailsForm.value);
          this.submitted = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
