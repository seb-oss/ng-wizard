import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { WizardControlService } from '@sebgroup/ng-wizard';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { StepService } from '../../../services/step.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
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
    private el: ElementRef,
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
  }
  stepStatus$ = this.stepService.getState().pipe(
    filter(res => res && res.data),
    tap(res => this.profileForm.setValue(res.data)),
  );
  /**
   * Save form data if form is valid
   */
  save() {
    this.stepService.saveState(this.profileForm.valid ? 'success' : 'danger', this.profileForm.value);
  }

  /**
   * Focus first invalid form control or alert message if it exists
   */
  private _focusInvalid() {
    if (this.profileForm.invalid) {
      const invalid: string = Object.keys(this.profileForm.controls).find(
        key => this.profileForm.controls[key].invalid,
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
    // subscribe to control events
    this.controls.controlEvent$.pipe(takeUntil(this.unsubscribe$)).subscribe(control => {
      switch (control.type) {
        case 'next':
          this.submitted = true;
          this.profileForm.markAllAsTouched();
          this._focusInvalid();
          this.save();
          break;
        case 'save':
          this.submitted = true;
          this.profileForm.markAllAsTouched();
          this.save();
          this._focusInvalid();
          break;
        case 'cancel':
          this.profileForm.reset();
          this.save();
          this.submitted = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
