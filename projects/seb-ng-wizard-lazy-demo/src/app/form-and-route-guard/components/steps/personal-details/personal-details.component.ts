import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { WizardControlService } from '@sebgroup/ng-wizard';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { StepService, StepState } from '../../../services/step.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
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

    this.$stepStatus = this.stepService.getState('/form-and-route-guard/personal-details').pipe(
      filter(res => res && res.data),
      tap(res => this.profileForm.setValue(res.data)),
      tap(_ => this.cdr.detectChanges()),
    );
  }

  /**
   * Save form data if form is valid
   */
  save() {
    // if (this.profileForm.valid) {
    this.stepService.saveState(
      '/form-and-route-guard/personal-details',
      this.profileForm.valid ? 'success' : 'warning',
      this.profileForm.value,
    );
    // }
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
          this.stepService.saveState(
            '/form-and-route-guard/personal-details',
            this.profileForm.valid,
            this.profileForm.value,
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
