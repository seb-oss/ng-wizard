import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  private _steps: StepStates;
  $steps: BehaviorSubject<StepStates> = new BehaviorSubject<any>({});
  constructor() {}
  saveState(step: string, state: boolean, data: any) {
    this._steps = { ...this._steps, [step]: { state, data } };
    this.$steps.next(this._steps);
  }

  getState(step: string): Observable<StepState> {
    return this.$steps.asObservable().pipe(map(steps => steps[step]));
  }
}

interface StepStates {
  [key: string]: StepState;
}

export interface StepState {
  state: boolean;
  data: any;
}
