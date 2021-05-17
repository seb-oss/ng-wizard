import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { WizardControlService } from '@sebgroup/ng-wizard';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { StepService, StepState } from '../../../services/step.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  $stepStatus: Observable<any>; // observable for step status
  unsubscribe$ = new Subject();
  accountDetailsForm: FormGroup;
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
    private fb: FormBuilder,
    public controls: WizardControlService,
    private cdr: ChangeDetectorRef,
    private el: ElementRef,
  ) {
    this.accountDetailsForm = fb.group({
      accountType: fb.control(null, [Validators.required]),
    });

    this.$stepStatus = this.stepService.getState('/form-and-route-guard/account-details').pipe(
      filter(res => res && res.data),
      tap(res => this.accountDetailsForm.setValue(res.data)),
      tap(_ => this.cdr.detectChanges()),
    );
  }

  /**
   * Save form data if form is valid
   */
  save() {
    // if (this.accountDetailsForm.valid) {
    // this.stepService.saveState('/form-and-route-guard/account-details', this.accountDetailsForm.valid ? 'success' : 'danger', this.accountDetailsForm.value);
    // }
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
    /*this.accountTypes.map(type =>
      this.accountType
        .push(new FormControl(false)
        )
    );*/
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
        case 'save':
          this.submitted = true;
          this.accountDetailsForm.markAllAsTouched();
          this.save();
          this._focusInvalid();
          break;
        case 'cancel':
          this.accountDetailsForm.reset();
          this.stepService.saveState(
            '/form-and-route-guard/account-details',
            this.accountDetailsForm.valid,
            this.accountDetailsForm.value,
          );
          this.submitted = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
