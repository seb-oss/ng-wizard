import { Route } from '@angular/router';
import { Observable } from 'rxjs';
export declare type WizardControls = WizardControl[];

export interface WizardStepConfigs {
  [key: string]: WizardStepConfig;
}

export interface WizardStepConfig {
  data: WizardStepData;
  path: string;
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
  controls: WizardControl[];
  state?: 'success' | 'warning' | 'danger' | 'info';
  secondaryContent?: {
    component: any;
    data?: { [key: string]: any };
    class?: string;
  };
  subSteps?: string[];
}

export interface WizardControl {
  text?: string; // label for action
  title?: string; // title/description added to the control (useful for screen readers etc).
  path?: string | Observable<string>; // path where action takes user (optional)
  class?: string; // class to be added to control (optional)
  type: 'next' | 'prev' | 'cancel' | 'save' | 'close'; // type of action (determines icon and can be used for custom triggers)
}
