import { Route } from '@angular/router';
import { Observable } from 'rxjs';
export declare type WizardControls = WizardControl[];

export declare type StepState = 'success' | 'warning' | 'danger' | 'info' | null;

export interface WizardStepConfigs {
  [key: string]: WizardStepConfig;
}

export interface WizardStepConfig {
  id?: string;
  data: WizardStepData;
  path: string;
  fullPath?: string;
  children?: {
    [key: string]: WizardStepConfig;
  };
}
export interface WizardStep extends Route {
  data?: WizardStepData;
  children?: WizardStep[];
}

export interface WizardStepData {
  number?: number;
  heading: string; // step heading
  pageHeading?: string; // step heading
  hideNavigation?: boolean;
  controls?: WizardControl[];
  state?: StepState;
  secondaryContent?: {
    component: any;
    data?: { [key: string]: any };
    class?: string;
  };
  subSteps?: string[];
  [key: string]: any;
}

export interface WizardControl {
  text?: string; // label for action
  title?: string; // title/description added to the control (useful for screen readers etc).
  path?: string | Observable<string>; // path where action takes user (optional)
  class?: string; // class to be added to control (optional)
  type: 'next' | 'prev' | 'other' | 'cancel' | 'save' | 'close' | 'print';
  // type of action (determines icon and can be used for custom triggers)
}
